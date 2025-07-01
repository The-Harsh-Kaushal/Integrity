const express = require("express");
const storedHash = require("../Modals/HashSchema");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Function to hash a file using a stream
const hashFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
};

// Middleware to create a new block
const CreateBlock = async (req, res, next) => {
  const email = req.user;
  try {
    const lBlock = await storedHash
      .findOne({ unique_id: email })
      .sort({ index: -1 })
      .select("blockHash index");

    const previousHash =
      lBlock?.blockHash || crypto.randomBytes(32).toString("hex");
    const newIndex = lBlock ? lBlock.index + 1 : 0;

    const filePath = path.resolve(__dirname, `../upload/${req.file.filename}`);
    const docHash = await hashFile(filePath);

    // Combine current doc hash and previous block hash for the new block hash
    const combined = docHash + previousHash;
    const blockHash = crypto
      .createHash("sha256")
      .update(combined)
      .digest("hex");

    const ABlock = new storedHash({
      unique_id: email,
      index: newIndex,
      previousHash: previousHash,
      blockHash: blockHash,
      docHash: docHash,
      filetype: req.file.mimetype,
      filename: req.file.originalname,
    });
    
    await ABlock.save();
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      }
      const ClientResp = {
        index : newIndex,
        docHash: blockHash,
        filetype: req.file.mimetype,
        filename: req.file.originalname
      }
      req.CSendbackR = ClientResp;
      next();
    });
  } catch (err) {
    console.error("CreateBlock error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to create block",
    });
  }
};

const fetchAllBlocks = async (req, res, next) => {
  const email = req.user;
  try {
    const AllBlocks = await storedHash
      .find({ unique_id: email })
      .select("index timestamp filename lastverified chained");
    req.AllBlocks = AllBlocks;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const verifyChain = async (req, res, next) => {
  const email = req.user;

  try {
    const Allblocks = await storedHash
      .find({ unique_id: email })
      .sort({ index: 1 });

    for (let i = 0; i < Allblocks.length; i++) {
      const current = Allblocks[i];
      const previous = i === 0 ? null : Allblocks[i - 1];

      const previousHash = current.previousHash;
      const docHash = current.docHash;

      const expectedBlockHash = crypto
        .createHash("sha256")
        .update(previousHash + docHash)
        .digest("hex");

      current.chained =
        (i === 0 || previous.blockHash === previousHash) &&
        expectedBlockHash === current.blockHash;

      current.lastVerified = Date.now();
    }

    await Promise.all(Allblocks.map((doc) => doc.save()));

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const DocVerification = async (req, res, next) => {
  const email = req.user;
  const filePath = path.resolve(__dirname, `../upload/${req.file.filename}`);
  const Dochash = await hashFile(filePath);
  try {
    const FindHash = await storedHash
      .findOne({
        unique_id: email,
        docHash: Dochash,
      })
      .select("index");
    req.VerifiedDoc = {
      match: !!FindHash,
      block: FindHash || null,
    };

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      }
      next();
    });
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports = {
  CreateBlock,
  fetchAllBlocks,
  verifyChain,
  verifyChain,
  DocVerification,
};

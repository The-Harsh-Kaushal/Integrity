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

    const filePath = req.file.path;
    const docHash = await hashFile(filePath);

    // to check if the same file already exsist
    try {
      const existing = await storedHash
        .findOne({ unique_id: email, docHash })
        .select("index")
        .lean();

      if (existing) {
        // Clean up temp file so disk doesn’t fill up
        fs.unlink(filePath, () => {});
        return res.status(409).json({
          success: false,
          message: `File already exists at index ${existing.index}`,
        });
      }
    } catch (err) {
      console.error("Duplicate‑check error:", err);
      return res.status(500).json({
        success: false,
        message: "Server error while checking duplicates",
      });
    }

    // …proceed to create and save the new block here…

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
    console.log("Trying to delete:", filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err); 
      } else {
        console.log("File deleted successfully.");
        const ClientResp = {
          index: newIndex || null,
          docHash: docHash || null,
        };
        req.CSendbackR = ClientResp;
        next();
      }
    });
  } catch (err) {
    console.error("CreateBlock error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create block",
    });
  }
};

const fetchAllBlocks = async (req, res, next) => {
  const email = req.user;

  try {
    const AllBlocks = await storedHash
      .find({ unique_id: email })
      .select("index timestamp filename lastVerified chained -_id");
    req.AllBlocks = AllBlocks;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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
      const curr = Allblocks[i];
      const prev = i === 0 ? null : Allblocks[i - 1];

      //  the digest should be in same order as it was in createblock changing positions can cause diffrent values
      const newhash =
        curr.docHash + (prev ? prev.blockHash : curr.previousHash);
      const expectedHash = crypto
        .createHash("sha256")
        .update(newhash)
        .digest("hex");

      // 2) Two checks: link is correct AND data‑hash is correct
      const linkOK =
        i === 0 // genesis: no link to check
          ? true
          : prev.chained && prev.blockHash === curr.previousHash;
      const dataOK = expectedHash === curr.blockHash;

      // The block is chained only if *both* conditions hold
      curr.chained = linkOK && dataOK;
      curr.lastVerified = new Date(); // Date object > raw ms number
    }

    await Promise.all(Allblocks.map((doc) => doc.save()));

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const DocVerification = async (req, res, next) => {
  const email = req.user;
  const filePath = req.file.path;
  const Dochash = await hashFile(filePath);
  try {
    const FindHash = await storedHash
      .findOne({
        unique_id: email,
        docHash: Dochash,
      })
      .select("index docHash");
    req.VerifiedDoc = {
      index: FindHash.index || null,
      docHash: FindHash.docHash || null,
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
      message: "No such Documnet Present In Chain",
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

const express = require("express");
const multer = require("multer");
const path = require("path");
const { CreateBlock, DocVerification } = require("../Middleware/Block");
const { VerifySession } = require("../Middleware/Session");

const Routes = express.Router();
const allowedTypes = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "application/json",
  "text/csv",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, cb) {
    const Unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, `${Unique}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Unsupported file type: ${
            file.mimetype
          }. Allowed types are: ${allowedTypes.join(", ")}`
        ),
        false
      );
    }
  },
});

Routes.post(
  "/upload",
  VerifySession,
  upload.single("filetohash"),
  CreateBlock,
  (req, res) => {
    console.log(req.file);
    return res.status(200).json({
      success: true,
      message: "Document Upload Sucessfull",
      block: req.CSendbackR,
    });
  }
);

Routes.post(
  "/verifydoc",
  VerifySession,
  upload.single("filetohash"),
  DocVerification,
  (req, res) => {
    console.log("verifydoc route hit..................................................")
    return res.status(200).json({
      success: true,
      message: "Document Verification  Sucessfull",
      block: req.VerifiedDoc,
    });
  }
);
module.exports = Routes;

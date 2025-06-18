const express = require("express");
const multer = require("multer");
const path = require("path");

const Routes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, cb) {
    const Unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, `${Unique}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

Routes.post("/upload", upload.single("filetohash"), (req, res) => {
  console.log(req.file);
  return res.json({ messae: "yo" });
});

module.exports = Routes;

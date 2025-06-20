const express = require("express");
const Routes = express.Router();
const { VerifySession } = require("../Middleware/Session");
const { fetchAllBlocks, verifyChain } = require("../Middleware/Block");

Routes.post("/getallblocks", VerifySession, fetchAllBlocks, (req, res) => {
  return res.status(200).json({
    success: true,
    blocks: req.AllBlocks,
  });
});
Routes.post("/verifychain", VerifySession, verifyChain, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Refresh",
  });
});

module.exports = Routes;

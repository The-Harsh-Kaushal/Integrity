const express = require("express");
const Routes = express.Router();
const User = require("../Modals/UserSchema");
const bcrypt = require("bcrypt");

const {
  LogMidware,
  SigMidware,
  RefreshSession,
} = require("../Middleware/Auth");

const { CreateSession } = require("../Middleware/Session");

// User signup
Routes.post("/signup", SigMidware, CreateSession, async (req, res) => {
  const { accessToken, refreshToken } = req;

  res.status(201).json({
    success: true,
    message: "Signup successful",
    accessToken,
    refreshToken,
  });
});

// User login
Routes.post("/login", LogMidware, CreateSession, async (req, res) => {
  const { accessToken, refreshToken } = req;

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
  });
});

// Token refresh
Routes.post("/refresh", RefreshSession, async (req, res) => {
  const { NewSession } = req;

  res.status(200).json({
    success: true,
    message: "Access token refreshed",
    accessToken: NewSession,
  });
});

module.exports = Routes;

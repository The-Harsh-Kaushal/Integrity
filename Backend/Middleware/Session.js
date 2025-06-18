const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { promisify } = require("util");
const { RefreshToken } = require("../Modals/RefSchema");

const AsyncSign = promisify(jwt.sign);
const AsyncVerify = promisify(jwt.verify);

// Create a new session and store refresh token
const CreateSession = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required to generate tokens",
    });
  }

  try {
    const accessToken = await AsyncSign({ email }, process.env.SESSION_SECRET, {
      expiresIn: "15s",
    });

    const refreshToken = await AsyncSign({ email }, process.env.REFRESH_SECRET);

    req.accessToken = accessToken;
    req.refreshToken = refreshToken;

    const ref = new RefreshToken({ refresh: refreshToken, email });

    await ref.save();

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Failed to generate or save tokens",
      details: err.message,
    });
  }
};

// Middleware to verify access token
const VerifySession = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token is missing",
    });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Access token is invalid or expired",
      });
    }

    req.user = decoded;
    next();
  });
};

// Refresh access token using refresh token
const RefreshSession = async (req, res, next) => {
  const { refTok } = req.body;

  if (!refTok) {
    return res.status(400).json({
      success: false,
      error: "Refresh token is required",
    });
  }

  const existing = await RefreshToken.findOne({ refresh: refTok });

  if (!existing) {
    return res.status(403).json({
      success: false,
      error: "Refresh token not recognized",
    });
  }

  try {
    const decoded = await AsyncVerify(refTok, process.env.REFRESH_SECRET);
    const { email } = decoded;

    const newAccessToken = await AsyncSign(
      { email },
      process.env.SESSION_SECRET,
      { expiresIn: "15s" }
    );

    req.NewSession = newAccessToken;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Refresh token is invalid or expired",
    });
  }
};

module.exports = { CreateSession, VerifySession, RefreshSession };

const express = require("express");
const Routes = express.Router();
const User = require("../Modals/UserSchema");
const bcrypt = require("bcrypt");

const { LogMidware, SigMidware } = require("../Middleware/Auth");
const {
  RefreshSession,
  LogOutAll,
  LogoutSession,
} = require("../Middleware/Session");

const { CreateSession } = require("../Middleware/Session");


// User signup
Routes.post("/signup", SigMidware, CreateSession, async (req, res) => {
  const { accessToken, refreshToken } = req;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    message: "Signup successful",
    session: accessToken,
  });
});

// User login
Routes.post("/login", LogMidware, CreateSession, async (req, res) => {
  const { accessToken, refreshToken } = req;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    success: true,
    message: "Login successful",
    session: accessToken,
  });
});

// Token refresh
Routes.post("/refresh", RefreshSession, async (req, res) => {
  const { NewSession } = req;
  res.status(200).json({
    success: true,
    message: "Access token refreshed",
    session: NewSession,
  });
});

Routes.post("/logout", LogoutSession, async (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/auth" });
  return res.status(204).json({
    success: true,
    message: "sucessfull Logut",
  });
});
Routes.post("/logoutall", LogOutAll, async (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/auth" });
  return res.status(204).json({
    sucess: true,
    message: "sucessfull Logout",
  });
});

module.exports = Routes;

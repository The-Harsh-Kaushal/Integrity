const mongoose = require("mongoose");
const express = require("express");
const User = require("../Modals/UserSchema");
const bcrypt = require("bcrypt");

const LogMidware = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      status: false,
      error: "Fill the required Fields",
    });
  }
  const { email, password } = req.body;
  const AUser = await User.findOne({ email: email });
  if (!AUser) {
    return res.status(404).json({
      status: false,
      error: "No such User Exsist",
    });
  }
  const CheckStatus = await bcrypt.compare(password, AUser.password);
  if (!CheckStatus) {
    return res.status(401).json({
      status: false,
      error: "Wrong Credentials",
    });
  }
  next();
};
const SigMidware = async (req, res, next) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(401).json({
      status: false,
      error: "Fill the required Fields",
    });
  }

  const { name, email, password } = req.body;
  const AUser = await User.findOne({ email: email });
  if (AUser) {
    return res.status(401).json({
      status: false,
      error: "User already exsist",
    });
  }
  const HashedPassword = await bcrypt.hash(password, 10);
  const NewUser = new User({
    name: name,
    email: email,
    password: HashedPassword,
  });
  try {
    await NewUser.save();
    next();
  } catch (err) {
    return res.status(405).json({
      status: false,
      message: "Server Error",
      error: err,
    });
  }
};

module.exports = { LogMidware, SigMidware };

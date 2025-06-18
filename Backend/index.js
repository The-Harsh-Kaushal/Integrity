const express = require("express");
const App = express();
const Mongoose = require("mongoose");

const authenticationRoutes = require("./Routes/authentication");
const { VerifySession } = require("./Middleware/Session");
const uploadRoutes = require("./Routes/fileupload");

const cors = require("cors");

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use("/api/auth", authenticationRoutes);
App.use("/api", uploadRoutes);
App.use(express.static("static"));

App.get("/", VerifySession, (req, res) => {
  const user = req.user;
  return res.status(200).json({ message: "hello ", user: user });
});

const ConnectDB = () => {
  Mongoose.connect("mongodb://localhost:27017/integrity")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
};
ConnectDB();
App.listen(5000, () => {
  console.log("server is listening at port 5000..");
});

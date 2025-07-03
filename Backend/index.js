const express = require("express");
const App = express();
const Mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authenticationRoutes = require("./Routes/authentication");
const { VerifySession } = require("./Middleware/Session");
const uploadRoutes = require("./Routes/fileupload");
const blockRoutes = require("./Routes/blockroutes");

const allowed = JSON.parse(process.env.ALLOWED_DOMAIN || "[]");
App.use(
  cors({
    origin: allowed,
    credentials: true,
  })
);

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

App.use("/api/auth", authenticationRoutes);
App.use("/api/uploads", uploadRoutes);
App.use("/api/block", blockRoutes);
App.use((err, req, res, next) => {
  if (
    err instanceof require("multer").MulterError ||
    err.message.includes("Unsupported file type")
  ) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
});

App.get("/", VerifySession, (req, res) => {
  const user = req.user;
  return res.status(200).json({ message: "hello ", user: user });
});

const ConnectDB = () => {
  Mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
};
ConnectDB();
App.listen(5000, () => {
  console.log("server is listening at port 5000..");
});

const express = require("express");
const path = require("path");
const App = express();
const Mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");


const uploadPath = path.join(__dirname, "upload");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("✅ Created missing upload directory on startup.");
}

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


App.use(express.static(path.join(process.cwd(), "client/dist")));


App.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(
    path.join(process.cwd(), "client/dist", "index.html")
  );
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

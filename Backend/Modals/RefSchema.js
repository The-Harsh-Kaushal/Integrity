const mongoose = require("mongoose");
const RefSchema = new mongoose.Schema({
  refresh: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const RefreshToken = mongoose.model("RefreshToken", RefSchema);
module.exports = { RefreshToken };

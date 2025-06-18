const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
  unique_id: { type: String, require: true, unique: true },
  index: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  previousHash: { type: String, required: true },
  blockHash: { type: String, required: true },
  docHash: { type: String, required: true },
  filename: { type: String, required: true },
});

const StoredHash = mongoose.model("Hashes", HashSchema);
module.exports = StoredHash;

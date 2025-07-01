const mongoose = require("mongoose");

const HashSchema = new mongoose.Schema({
  unique_id: { type: String, require: true },
  index: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  previousHash: { type: String, required: true },
  blockHash: { type: String, required: true, unique:true },
  docHash: { type: String, required: true },
  filename: { type: String, required: true },
  lastVerified: { type: Date, default: Date.now() },
  chained: { type: Boolean, default: true },
});

const StoredHash = mongoose.model("Hashes", HashSchema);
module.exports = StoredHash;

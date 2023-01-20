const mongoose = require("mongoose");

const clSchema = new mongoose.Schema({
  matric: {
    type: String,
    required: true,
    max: 255,
  },
  name: {
    type: String,
    required: true,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CriminalLaw", clSchema);
const mongoose = require("mongoose");

const ltSchema = new mongoose.Schema({
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
  imagePath: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LawOfTort", ltSchema);

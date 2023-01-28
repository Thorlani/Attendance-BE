const mongoose = require("mongoose");

const HrCount = new mongoose.Schema({
  number: {
    type: String,
    require: true,
    max: 50,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HrCounter", HrCount);

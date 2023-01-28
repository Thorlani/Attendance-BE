const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const IpCount = new mongoose.Schema({
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

module.exports = mongoose.model("IpCounter", IpCount);

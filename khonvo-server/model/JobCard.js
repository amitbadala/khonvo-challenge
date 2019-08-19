const mongoose = require("mongoose");

let JobCard = new mongoose.Schema({
  company: String,
  description: String,
  name: String,
  email: String,
  placementSum: Number,
  forecastValue: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("JobCard", JobCard);

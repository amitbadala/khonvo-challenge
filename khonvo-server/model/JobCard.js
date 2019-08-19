const mongoose = require("mongoose");

let JobCard = new mongoose.Schema({
  company: String,
  description: String,
  name: String,
  email: String,
  placementSum: Number
});

module.exports = mongoose.model("JobCard", JobCard);

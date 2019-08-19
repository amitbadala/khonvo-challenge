const mongoose = require("mongoose");

let Candidate = new mongoose.Schema({
  stage: {
    type: Number,
    default: 0
  },
  name: String,
  email: String,
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCard"
  }
});

module.exports = mongoose.model("Candidate", Candidate);

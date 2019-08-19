const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const JobCard = require("./model/JobCard");
const Candidate = require("./model/Candidate");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbUrl =
  "mongodb+srv://admin:FRsojwU0AjxQyWhS@scryptonian-ghufh.mongodb.net/test?retryWrites=true&w=majority";
const localDbUrl = "mongodb://localhost:27017/cms";

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Mongoose Connected");
  });

app.get("/getJobCards", async (req, res) => {
  try {
    let jobCards = await JobCard.find();
    return res.json(jobCards);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

app.post("/addJobCard", async (req, res) => {
  const { company, description, name, email, placementSum } = req.body;
  try {
    let newJobCard = new JobCard({
      company,
      description,
      name,
      email,
      placementSum
    });
    let result = await newJobCard.save();
    return res.json(result);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

app.post("/updateJobCard", async (req, res) => {
  const { _id, company, description, name, email, placementSum } = req.body;
  try {
    let result = await JobCard.findByIdAndUpdate(
      { _id },
      { company, description, name, email, placementSum }
    );
    return res.json(result);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

app.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    let result = JobCard.findByIdAndRemove({ _id });
    return res.json(result);
  } catch (err) {
    return res.send({ error: err.errmsg });
  }
});

// CANDIDATES API START

app.get("/getCandidatesByJob/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(jobId)) {
      let candidates = await Candidate.find({ jobId });
      return res.json(candidates);
    } else {
      res.status(400).json({ error: "Incorrect Job Id" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.errmsg });
  }
});

app.post("/addCandidate", async (req, res) => {
  const { name, email, jobId } = req.body;
  try {
    let newCandidate = new Candidate({ name, email, jobId });
    let candidate = await newCandidate.save();
    return res.json(candidate);
  } catch (err) {
    return res.json({ error: err.errmsg });
  }
});

app.post("/updateStage", async (req, res) => {
  const { _id, stage } = req.body;
  try {
    let candidate = await Candidate.findByIdAndUpdate(
      { _id },
      { $set: { stage } },
      { new: true }
    );
    return res.json(candidate);
  } catch (err) {
    return res.json({ error: err.errmsg });
  }
});

// CANDIDATES API END

//FORECAST CALCULATIONS START

const stageWisePercentage = [];
stageWisePercentage[0] = 0;
stageWisePercentage[1] = 0.1;
stageWisePercentage[2] = 0.25;
stageWisePercentage[3] = 0.75;
stageWisePercentage[4] = 1;

const updateJobForecastValue = (jobId, forecastValue) => {
  let result = JobCard.findByIdAndUpdate(
    { _id: jobId },
    { $set: { forecastValue } },
    { new: true }
  );
};

app.get("/getForecastByJobId/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    //Select the maximum stage from the candidates for a given job
    let result = await Candidate.findOne({ jobId })
      .sort({ stage: -1 })
      .limit(1)
      .populate("jobId");
    const value = stageWisePercentage[result.stage] * result.jobId.placementSum;
    updateJobForecastValue(jobId, value);

    return res.json({
      forecastValue: value
    });
  } catch (err) {
    return res.json({ error: err.errmsg });
  }
});

//FORECASR CALCULATIONS END

app.listen(PORT, () => {
  console.log("Server Started");
});

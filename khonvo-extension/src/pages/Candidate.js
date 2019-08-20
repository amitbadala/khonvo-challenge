import React, { useState, useEffect } from "react";
import { Row, Col, Icon, message, Button, Badge } from "antd";
import axios from "axios";
import CandidateList from "./../components/CandidateList";
import AddCandidate from "./../components/AddCandidate";
import Chart from "chart.js";

const apiUrl = "http://localhost:5000";

const Candidate = ({ currentJob, handleMenuChange }) => {
  const initialCandidateState = {
    name: "",
    email: "",
    _id: null,
    jobId: currentJob._id || ""
  };

  const [candidate, setCandidate] = useState(initialCandidateState);
  const [candidateList, setCandidateList] = useState([]);
  const [currentJobDetails, setCurrentJob] = useState({
    ...currentJob,
    forecastValue: 0
  });
  const [stage0, stage1, stage2, stage3, stage4] = [
    "#F67383",
    "#9ad6ff",
    "#ecf0f1",
    "#FFCD56",
    "#60D78C"
  ];

  useEffect(() => {
    calculateGraphValues();
    getForecastValue();
  }, [candidateList]);

  useEffect(() => {
    fetchCandidateList();
  }, []);

  const deleteCandidate = async (event, id) => {
    event.stopPropagation();
    await axios.delete(`${apiUrl}/deleteCandidate/${id}`);
    fetchCandidateList();
  };

  const calculateGraphValues = _ => {
    let test = Array(5).fill(0);
    candidateList.forEach(candidate => {
      switch (candidate.stage) {
        case 0: {
          test[0] = test[0] + 1;
          break;
        }
        case 1: {
          test[1] = test[1] + 1;
          break;
        }
        case 2: {
          test[2] = test[2] + 1;
          break;
        }
        case 3: {
          test[3] = test[3] + 1;
          break;
        }
        case 4: {
          test[4] = test[4] + 1;
          break;
        }
      }
    });
    addGraph(test);
  };

  const fetchCandidateList = async () => {
    let candidates = await axios.get(
      `${apiUrl}/getCandidatesByJob/${candidate.jobId}`
    );
    setCandidateList(candidates.data);
  };

  const getForecastValue = async _ => {
    let result = await axios.get(
      `${apiUrl}/getForecastByJobId/${candidate.jobId}`
    );
    setCurrentJob({
      ...currentJobDetails,
      forecastValue: result.data.forecastValue
    });
  };

  const handleCandidateOnChange = event => {
    const { name, value } = event.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const addCandidate = async _ => {
    let result = await axios.post(`${apiUrl}/addCandidate`, candidate);
    message.success("Added Candidate");
    if (result) {
      fetchCandidateList();
      setCandidate(initialCandidateState);
    }
  };

  const handleStageChange = async (_id, stage) => {
    let updatedList = await axios.post(`${apiUrl}/updateStage`, { _id, stage });
    setCandidateList(
      [
        ...candidateList.filter(candidate => candidate._id !== _id),
        updatedList.data
      ].sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())
    );
  };

  const addGraph = values => {
    var data = {
      labels: ["Rejected", "Proposing", "Interviewing", "Offer", "Accepted"],
      datasets: [
        {
          data: values,
          backgroundColor: [stage0, stage1, stage2, stage3, stage4],
          borderWidth: 0 //this will hide border
        }
      ]
    };

    var options = {
      animation: {
        steps: 50,
        rotate: true,
        scale: false
      },
      legend: {
        display: true,
        labels: {
          fontColor: "#fff",
          boxWidth: 10
        }
      },
      title: {
        display: true,
        text: "Candidates Status",
        fontColor: "#fff"
      }
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options
    });
  };

  return (
    <div>
      <div className="subNav">
        <h5>
          <Button
            type="link"
            style={{ color: "black" }}
            icon="arrow-left"
            size={"small"}
            onClick={() => handleMenuChange("Home")}
          />
          {`${currentJobDetails.company}  |  ${currentJobDetails.description}`}

          <span style={{ float: "right", padding: "2px" }}>
            <Badge color={"lime"} status="processing" />
            {`Forecast Amount :
            $ ${currentJobDetails.forecastValue}`}
          </span>
        </h5>
      </div>
      <Row className="customRow">
        <Col className="left split" span={12}>
          <h4 className="text-center">
            <Icon type="user" /> Candidate List
          </h4>
          <CandidateList
            candidateList={candidateList}
            handleStageChange={handleStageChange}
            deleteCandidate={deleteCandidate}
          />
        </Col>
        <Col className="right split" span={12}>
          <canvas id="myChart" width="400" height="400" />
          <AddCandidate
            candidate={candidate}
            handleCandidateOnChange={handleCandidateOnChange}
            addCandidate={addCandidate}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Candidate;

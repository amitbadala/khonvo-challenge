import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import axios from "axios";
import AddJob from "./../components/AddJob";
import JobCard from "./../components/JobCard";

const apiUrl = "http://localhost:5000";

const Home = ({ handleMenuChange }) => {
  const initialJobState = {
    company: "",
    description: "",
    email: "",
    name: "",
    placementSum: "",
    forecastValue: 0,
    _id: null
  };
  const [jobCards, setJobCards] = useState([]);
  const [jobDetails, setJobDetails] = useState(initialJobState);
  const [editJobMode, setEditJobMode] = useState(false);
  const [totalForecastAmount, SetForecastAmount] = useState(0);

  useEffect(() => {
    fetchJobCards();
  }, []);

  useEffect(() => {
    updateForecastAmount();
  }, [jobCards]);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const fetchJobCards = async () => {
    let jobs = await axios.get(`${apiUrl}/getJobCards`);
    setJobCards(jobs.data);
  };

  const updateForecastAmount = _ => {
    let totalSum = jobCards.reduce((acc, el) => acc + el.forecastValue, 0);
    SetForecastAmount(totalSum);
  };

  const addJobCard = async _ => {
    if (editJobMode) {
      await axios.post(`${apiUrl}/updateJobCard`, jobDetails);
      setEditJobMode(false);
    } else {
      await axios.post(`${apiUrl}/addJobCard`, jobDetails);
    }
    fetchJobCards();
    setJobDetails(initialJobState);
  };

  const deleteJobCard = async id => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchJobCards();
  };

  const editJob = async job => {
    setJobDetails({ ...jobDetails, ...job });
    setEditJobMode(true);
  };

  return (
    <div>
      <Row className="customRow">
        <Col className="left split" span={12}>
          <JobCard
            jobs={jobCards}
            editJob={editJob}
            handleMenuChange={handleMenuChange}
            deleteJobCard={deleteJobCard}
          />
        </Col>
        <Col className="right split" span={12}>
          <AddJob
            totalForecastAmount={totalForecastAmount}
            jobDetails={jobDetails}
            handleOnChange={handleOnChange}
            addJobCard={addJobCard}
            editJobMode={editJobMode}
            handleMenuChange={handleMenuChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;

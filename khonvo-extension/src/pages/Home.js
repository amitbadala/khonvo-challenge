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
    _id: null
  };
  const [jobCards, setJobCards] = useState([]);
  const [jobDetails, setJobDetails] = useState(initialJobState);
  const [editJobMode, setEditJobMode] = useState(false);

  useEffect(() => {
    fetchJobCards();
  }, []);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const fetchJobCards = async () => {
    let jobs = await axios.get(`${apiUrl}/getJobCards`);
    setJobCards(jobs.data);
  };

  const addJobCard = async _ => {
    await axios.post(`${apiUrl}/addJobCard`, jobDetails);
    fetchJobCards();
    setJobDetails(initialJobState);
  };

  const editJob = async job => {
    setJobDetails({ ...jobDetails, ...job });
    setEditJobMode(true);
  };

  return (
    <div>
      <Row className="customRow">
        <Col className="left split" span={12}>
          <JobCard jobs={jobCards} editJob={editJob} />
        </Col>
        <Col className="right split" span={12}>
          <AddJob
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

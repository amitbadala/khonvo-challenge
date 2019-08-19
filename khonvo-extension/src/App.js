import React, { useState } from "react";
import { Layout, Row, Icon } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import Home from "./pages/Home";
import Candidate from "./pages/Candidate";

const { Header, Content } = Layout;

function App() {
  const [menu, setMenu] = useState("Home");
  const [currentJob, setCurrentJob] = useState({});

  const handleMenuChange = (nextPage, jobDetails) => {
    if (jobDetails) {
      setCurrentJob(jobDetails);
    }
    setMenu(nextPage);
  };

  return (
    <Layout>
      <Header className="customHeader">
        <Row>
          <h4 style={{ color: "white" }}>
            <Icon type="thunderbolt" />
            Candidate Management System
          </h4>
        </Row>
      </Header>
      <Content>
        {menu === "Home" ? (
          <Home handleMenuChange={handleMenuChange} />
        ) : (
          <Candidate
            handleMenuChange={handleMenuChange}
            currentJob={currentJob}
          />
        )}
      </Content>
    </Layout>
  );
}

export default App;

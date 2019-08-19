import React, { Fragment } from "react";
import { Button, Statistic, Icon, Row, Col } from "antd";

const AddForm = ({
  jobDetails,
  addJobCard,
  handleOnChange,
  editJobMode,
  handleMenuChange
}) => {
  return (
    <Fragment>
      <Row className="job-forecast">
        <Col span={12}>
          <Statistic
            title="Forecast Amount"
            value={1128}
            prefix={<span>$</span>}
            valueStyle={{ color: "#fff" }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Fixed Amount"
            value={1128}
            prefix={<span>$</span>}
            valueStyle={{ color: "#fff" }}
          />
        </Col>
      </Row>
      <h4 style={{ color: "white", textAlign: "center" }}>
        {editJobMode ? "Update Card" : "Create Job Card"}
      </h4>
      <form className="customForm">
        <div className="group">
          <input
            type="text"
            placeholder=" "
            name="company"
            value={jobDetails.company}
            onChange={handleOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Company</label>
        </div>
        <div className="group">
          <input
            type="text"
            placeholder=" "
            name="description"
            value={jobDetails.description}
            onChange={handleOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Description</label>
        </div>
        <div className="group">
          <input
            type="text"
            placeholder=" "
            name="name"
            value={jobDetails.name}
            onChange={handleOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Name</label>
        </div>
        <div className="group">
          <input
            type="email"
            placeholder=" "
            name="email"
            value={jobDetails.email}
            onChange={handleOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Email</label>
        </div>
        <div className="group">
          <input
            type="number"
            placeholder=" "
            name="placementSum"
            value={jobDetails.placementSum}
            onChange={handleOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Placement Sum</label>
        </div>
        <div className="jobActions">
          <Button
            type="default"
            shape="round"
            size="default"
            onClick={() => addJobCard()}
          >
            {editJobMode ? "Update" : "Create"}
          </Button>
          {editJobMode ? (
            <Button
              style={{ color: "white" }}
              type="link"
              onClick={() => handleMenuChange("Candidates", jobDetails)}
            >
              Details
            </Button>
          ) : null}
        </div>
        {/* <p className="note">
          Name and Email of Hiring Manager or Contact person of the Company
        </p> */}
      </form>
    </Fragment>
  );
};

export default AddForm;

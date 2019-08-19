import React, { Fragment } from "react";
import { Card, Icon } from "antd";

const JobCard = ({ jobs, editJob }) => {
  return (
    <Fragment>
      <h4 className="text-center">
        <Icon type="appstore" /> Job Cards
      </h4>
      <div className="flexRow">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="flexCol">
              <Card
                title={job.company}
                bordered={false}
                onClick={() => editJob(job)}
              >
                {job.description}
              </Card>
            </div>
          ))
        ) : (
          <h4>No Cards added yet</h4>
        )}
      </div>
    </Fragment>
  );
};

export default JobCard;

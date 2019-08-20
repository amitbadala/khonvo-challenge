import React, { Fragment } from "react";
import { Card, Icon, Empty, Badge, Popconfirm } from "antd";

const JobCard = ({ jobs, editJob, handleMenuChange, deleteJobCard }) => {
  return (
    <Fragment>
      <h4 className="text-center">
        <Icon type="appstore" /> Job Cards
      </h4>
      <div>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="flexCol">
              <Card
                title={job.company}
                extra={<Badge color="green" text={`$ ${job.forecastValue}`} />}
                bordered={false}
                size="small"
                actions={[
                  <Icon
                    type="eye"
                    className="jobCardIcon"
                    key="setting"
                    onClick={() => handleMenuChange("Candidates", job)}
                  />,
                  <Icon
                    type="edit"
                    className="jobCardIcon"
                    key="edit"
                    onClick={() => editJob(job)}
                  />,
                  <Popconfirm
                    title="Are you sure？"
                    onConfirm={() => deleteJobCard(job._id)}
                    icon={
                      <Icon type="question-circle-o" style={{ color: "red" }} />
                    }
                  >
                    <Icon
                      type="delete"
                      className="jobCardIcon"
                      key="ellipsis"
                    />
                  </Popconfirm>
                ]}
              >
                {job.description}
              </Card>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </Fragment>
  );
};

export default JobCard;

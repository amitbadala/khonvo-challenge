import React from "react";
import { Collapse, Steps, Icon } from "antd";
const { Panel } = Collapse;

const { Step } = Steps;

const CandidateList = ({
  candidateList,
  handleStageChange,
  deleteCandidate
}) => {
  return (
    <div>
      <Collapse accordion>
        {candidateList.length > 0
          ? candidateList.map((candidate, index) => (
              <Panel
                header={`${candidate.name} | ${candidate.email}`}
                key={index}
              >
                <Steps
                  current={candidate.stage}
                  direction="vertical"
                  size="small"
                  onChange={current =>
                    handleStageChange(candidate._id, current)
                  }
                >
                  <Step title="Rejected" value={10} />
                  <Step title="Proposing" value={10} />
                  <Step title="Interviewing" value={25} />
                  <Step title="Offer" value={75} />
                  <Step title="Accepted" value={75} />
                </Steps>
                <Icon
                  type="delete"
                  onClick={event => deleteCandidate(event, candidate._id)}
                />
              </Panel>
            ))
          : null}
      </Collapse>
    </div>
  );
};

export default CandidateList;

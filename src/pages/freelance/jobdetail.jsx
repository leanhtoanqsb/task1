import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutFreelance from '../../components/Freelance/LayoutFreelance';
import JobDetail from '../../components/Freelance/JobDetail';
import { findTaskByCode } from '../../database';

const FreelanceJobDetail = () => {
  const { code } = useParams();
  let jobData = findTaskByCode(code);
  jobData = jobData ? jobData[0][1] : {};

  return (
    <LayoutFreelance>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <JobDetail {...jobData} />
      </div>
    </LayoutFreelance>
  );
};

export default FreelanceJobDetail;

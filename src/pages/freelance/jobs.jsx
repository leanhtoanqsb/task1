import React from 'react';
import JobCard from '../../components/Freelance/JobCard';
import LayoutFreelance from '../../components/Freelance/LayoutFreelance';
import { getAllTask } from '../../database';

const FreelanceJobs = () => {
  const jobData = getAllTask();
  console.log(jobData)
  return (
    <LayoutFreelance>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <h2 className="text-2xl mb-4 font-medium">Jobs</h2>
        {
          jobData.map((job) => {
            return <JobCard key={job.code} {...job} />
          })
        }
      </div>
    </LayoutFreelance>
  );
};

export default FreelanceJobs;

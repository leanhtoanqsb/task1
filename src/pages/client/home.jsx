import React from 'react';
import LayoutClient from '../../components/Client/LayoutClient';
import ListTasksClient from '../../components/Client/ListTasksClient';
import { getMyTasks } from '../../database';

const Home = () => {
  let jobData = getMyTasks();
  jobData = Object.entries(jobData);
  return (
    <LayoutClient>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <h2 className="text-2xl mb-4 font-medium">Your tasks</h2>
        <div className="grid grid-cols-2 gap-4">
          {jobData?.map((job, index) => {
            const rx = job.splice(1, 1)[0][1];
            const main = rx;
            return <ListTasksClient key={index} {...main} />;
          })}
        </div>
      </div>
    </LayoutClient>
  );
};

export default Home;

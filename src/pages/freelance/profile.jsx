import React from 'react';
import LayoutFreelance from '../../components/Freelance/LayoutFreelance';
import ProfileFreelance from '../../components/Freelance/ProfileFreelance';
import { getUser } from '../../database/index.js';

const Profile = () => {

  return (
    <LayoutFreelance>
      <div className="mt-12 pb-12 px-2 md:px-0">
        <h2 className="text-2xl mb-4 font-medium">Profile</h2>
        <ProfileFreelance />
      </div>
    </LayoutFreelance>
  );
};

export default Profile;

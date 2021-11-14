import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser } from '../../database';

const NavigationFreelance = () => {
  const [logout, setLogout] = useState(false);
  const logoutSubmit = () => {
    setLogout(logoutUser());
  };
  if (logout) return <Redirect to="/" />;

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between py-5">
        <div className="flex justify-center items-center">
          <Link to="/client/home" className="text-xl font-semibold">
            JiraWork Freelancer
          </Link>
        </div>
        <div>
          <ul className="flex flex-col md:flex-row md:space-x-4 px-2 md:px-0 mt-5 md:mt-0">
            <li className="mb-4 md:mb-0 w-full md:w-auto">
              <Link
                to="/freelance/home"
                className="hover:bg-gray-200 rounded-lg py-2 px-4 block"
              >
                My Jobs
              </Link>
            </li>
            <li className="mb-4 md:mb-0 w-full md:w-auto">
              <Link
                to="/freelance/jobs"
                className="hover:bg-gray-200 rounded-lg py-2 px-4 block"
              >
                Jobs
              </Link>
            </li>
            <li className="mb-4 md:mb-0 w-full md:w-auto">
              <Link
                to="/freelance/profile"
                className="hover:bg-gray-200 rounded-lg py-2 px-4 block"
              >
                Profile
              </Link>
            </li>
            <li className="mb-4 md:mb-0 w-full md:w-auto">
              <Link
                to="/client/home"
                className="hover:bg-gray-200 rounded-lg py-2 px-4 block"
              >
                Go to Client
              </Link>
            </li>
            <li className="mb-4 md:mb-0 w-full md:w-auto">
              <button
                className="hover:bg-gray-200 rounded-lg py-2 px-4 block"
                onClick={logoutSubmit}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default NavigationFreelance;

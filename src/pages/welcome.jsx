import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="mx-auto w-full md:w-2/3 lg:w-1/3 flex justify-between items-center h-screen space-x-2">
      <Link
        to="/client/home"
        className="outline-none bg-black px-4 py-4 text-lg w-full text-white font-semibold text-center border border-black"
      >
        Client
      </Link>
      <Link
        to="/freelance/home"
        className="outline-none border border-black transition duration-300 px-4 py-4 text-lg w-full text-black font-semibold text-center"
      >
        Freelancer
      </Link>
    </div>
  );
};

export default Welcome;

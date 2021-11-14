import React from 'react';
import NavigationFreelance from './NavigationFreelance';

const LayoutFreelance = ({ children }) => {
  return (
    <div>
      <NavigationFreelance />
      <div className="max-w-5xl mx-auto h-screen">{children}</div>
    </div>
  );
};

export default LayoutFreelance;

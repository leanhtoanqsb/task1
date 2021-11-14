import React from 'react';
import NavigationClient from './NavigationClient';

const LayoutClient = ({ children }) => {
  return (
    <div>
      <NavigationClient />
      <div className="max-w-5xl mx-auto h-screen">{children}</div>
    </div>
  );
};

export default LayoutClient;

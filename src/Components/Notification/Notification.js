import React from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Notification;

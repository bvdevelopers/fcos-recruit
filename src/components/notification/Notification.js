// Notification.js

import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Close the notification after some time (e.g., 5 seconds)
      }, 7000); // Adjust the timeout as needed (e.g., 5000ms = 5 seconds)

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`notification-overlay-${type}`}>
      <div className={`notification-${type}`}>
        <div className="notification-content">
          <span className="close-button" onClick={handleClose}>
            X
          </span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;

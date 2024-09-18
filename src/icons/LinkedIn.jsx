import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Import LinkedIn brand icon

const LinkedIn = ({ size = '1x' }) => {
  return (
    <FontAwesomeIcon icon={faLinkedin} size={size} />
  );
};

export default LinkedIn;

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; 

const GitHubIcon = ({ size = '1x' }) => {
  return (
    <FontAwesomeIcon icon={faGithub} size={size} />
  );
};

export default GitHubIcon ;

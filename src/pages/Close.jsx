import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const Close = ({ size = '1x' }) => {
  return (
    <FontAwesomeIcon icon={faWindowClose} size={size} />
  );
}

export default Close;

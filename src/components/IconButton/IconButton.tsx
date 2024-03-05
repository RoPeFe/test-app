import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './IconButton.css'

interface IconButtonProps {
  onClick?: () => void;
  icon: IconDefinition;
  label: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, label, disabled = false }) => {
  return (
    <button className='icon-button' onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={icon} />
      {label}
    </button>
  );
};

export default IconButton;
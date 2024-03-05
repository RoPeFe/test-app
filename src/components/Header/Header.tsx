import React from 'react';
import IconButton from '../IconButton/IconButton';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './Header.css'

interface action {
    onClick?: () => void;
    icon: IconDefinition;
    label: string;
}

interface HeaderProps {
    actions: action[]
}

const Header: React.FC<HeaderProps> = ({ actions }) => {
    return <header>
        {actions.map(({ icon, label }, index) => {
            return <IconButton key={index} icon={icon} label={label} />
        })}
    </header>
};

export default Header;
import React, { useState } from 'react';
import './SideMenuModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface SideMenuModalProps {
    children: React.ReactNode;
}

const SideMenuModal: React.FC<SideMenuModalProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSideMenuModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="sideMenuModal-action" onClick={toggleSideMenuModal}><FontAwesomeIcon icon={faFilter} /></div>
            <div className={`sideMenuModal ${isOpen ? 'open' : ''}`}>
                <div className="sideMenuModal-content">
                    <span className="close" onClick={toggleSideMenuModal}>&times;</span>
                    {children}
                </div>
            </div>
        </>
    );
};

export default SideMenuModal;

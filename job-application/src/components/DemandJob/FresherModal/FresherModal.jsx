import React from 'react';

const FresherModal = ({ show, onClose, type }) => {
    if (!show) return null; // Don't render if not shown
    return (
        <div>
            <h2>{type} Modal</h2>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default FresherModal;

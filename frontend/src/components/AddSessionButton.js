// src/components/AddSessionButton.js
import React from 'react';
import styles from './AddSessionButton.module.css';

const AddSessionButton = ({ onClick }) => {
    return (
        <button 
            className={styles.fab} 
            onClick={onClick} 
            title="Host a Session"
        >
            +
        </button>
    );
};

export default AddSessionButton;
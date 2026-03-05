import React from 'react';
import styles from './AddSessionButton.module.css';

const AddSessionButton = () => {
    const handleClick = () => {
        alert("opens session creation component");
    };

    return (
    <button className={styles.fab} onClick={handleClick} title="Host a Session">
        +
    </button>
    );
};

export default AddSessionButton;
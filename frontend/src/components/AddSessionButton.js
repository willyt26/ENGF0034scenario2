import React, { useState } from 'react';
import styles from './AddSessionButton.module.css';
import SessionForm from './SessionForm';


const AddSessionButton = () => {
    const [createOpen, setCreateOpen] = useState(false);

    return (createOpen ? (<SessionForm />) : 
    (
        <button className={styles.fab} onClick={() => setCreateOpen(true)} title="Host a Session">
            +
        </button>
    ))

        


    ;
};

export default AddSessionButton;
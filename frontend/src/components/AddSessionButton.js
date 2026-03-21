import React, { useState } from 'react';
import styles from './AddSessionButton.module.css';
import SessionForm from './SessionForm';


const AddSessionButton = ({handleSubmit}) => {
    const [createOpen, setCreateOpen] = useState(false);

    return (createOpen ? (<SessionForm submitSession={() => {setCreateOpen(false); handleSubmit();} }/>) : 
    (
        <button className={styles.fab} onClick={() => setCreateOpen(true)} title="Host a Session">
            +
        </button>
    ))

        


    ;
};

export default AddSessionButton;
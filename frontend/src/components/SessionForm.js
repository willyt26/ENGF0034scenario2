import styles from './SessionForm.module.css';

const SessionForm = (onSubmit) => {
    // 
    return (
        <>
            {/* a library form */}
            <button className={styles.fab} onClick={onSubmit} title="Host a Session">
                + Submit
            </button>
        </>
    );
};

export default SessionForm;
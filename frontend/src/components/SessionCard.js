// src/components/SessionCard.js
import React from 'react';
import styles from './SessionCard.module.css';

const SessionCard = ({ session }) => {
  // Format the ISO string to a readable time 
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    // Format the date 
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    return (
        <div className={styles.card} onClick={() => console.log("Full Data:", session)}>
        <div className={styles.dateBadge}>
            <span className={styles.dateText}>{formatDate(session.startTime)}</span>
            <span className={styles.timeText}>{formatTime(session.startTime)}</span>
        </div>

        <div className={styles.mainInfo}>
            <div className={styles.topRow}>
            <span className={styles.category}>{session.category}</span>
            <span className={styles.location}>📍 {session.location}</span>
            </div>
            <h3 className={styles.title}>{session.title}</h3>
        </div>

        <button className={styles.joinButton}>Join</button>
        </div>
    );
};

export default SessionCard;
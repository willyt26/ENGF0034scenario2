// src/components/SessionCard.js
import React from 'react';
import styles from './SessionCard.module.css';

const SessionCard = ({ session, joined, onJoin, onSelect }) => {

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    const isFull = session.participants.length >= session.participantLimit;

    return (
        <div
            className={`
                ${styles.card} 
                ${joined ? styles.joined : ""} 
                ${isFull && !joined ? styles.full : ""}
            `}
            onClick={() => onSelect(session)}
        >
            {/* 1. DATE SECTION (Restored) */}
            <div className={styles.dateBadge}>
                <span className={styles.dateText}>
                    {formatDate(session.startTime)}
                </span>
                <span className={styles.timeText}>
                    {formatTime(session.startTime)}
                </span>
            </div>

            {/* 2. INFO SECTION (Restored) */}
            <div className={styles.mainInfo}>
                <div className={styles.topRow}>
                    <span className={styles.category}>
                        {session.subCategory || session.category}
                    </span>
                    <span className={styles.location}>
                        📍 {session.location}
                    </span>
                </div>

                <h3 className={styles.title}>
                    {session.title}
                </h3>
            </div>
            
            {/* 3. BUTTON SECTION */}
            <button
                disabled={isFull && !joined}
                className={`
                    ${styles.joinButton} 
                    ${joined ? styles.joinedButton : ""} 
                    ${isFull && !joined ? styles.fullButton : ""}
                `}
                onClick={(e) => {
                    e.stopPropagation();
                    onJoin(session.id);
                }}
            >
                {joined ? "Disjoin" : isFull ? "Full" : "Join"}
            </button>
        </div>
    );
};

export default SessionCard;
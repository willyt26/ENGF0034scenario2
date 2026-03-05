// src/pages/Home.js
import React, { useState } from 'react';
import { MOCK_DATA } from '../utils/mockData';
import SessionCard from '../components/SessionCard';
import styles from './Home.module.css';

const Home = () => {

    const [filter, setFilter] = useState("All");

    const filteredSessions = MOCK_DATA.filter(session => {
        if (filter === "All") return true;
        return session.category === filter;
    });

    return (
    <div className={styles.container}>
        <h1 className={styles.title}>UCL Peer-Connect</h1>

        <div className={styles.filterWrapper}>
        <label className={styles.label}>Filter By:</label>
        <select 
            className={styles.select} 
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
        >
            <option value="All">All Sessions</option>
            <option value="Social">Social</option>
            <option value="Study">Study</option>
        </select>
      </div>

        <div className={styles.list}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map(s => <SessionCard key={s.id} session={s} />)
        ) : (
            <p className={styles.empty}>No {filter} sessions found.</p>
        )}
        </div>
    </div>
    );
};

export default Home;
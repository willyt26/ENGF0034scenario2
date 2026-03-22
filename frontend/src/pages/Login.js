// src/components/Login.js
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    setError(""); // Clear old errors

    if (name.trim() === "") {
      setError("Please enter your name.");
      return;
    }
    
    if (!email.toLowerCase().endsWith("@ucl.ac.uk")) {
      setError("Invalid login details. Please enter a valid UCL email.");
      return;
    }

    onLogin({ name, email });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Welcome to <br /> 
          <span className={styles.appName}>UCL Peer-Connect</span>
        </h1>
        <p className={styles.subtitle}>Enter your login details below</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input 
              className={styles.input}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email"
              className={styles.input}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn}>
            Start Connecting!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
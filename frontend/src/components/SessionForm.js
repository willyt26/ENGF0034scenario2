// src/components/SessionForm.js
import React, { useState } from "react";
import { motion } from "framer-motion"; // Note: ensure you use "framer-motion" or "motion/react" based on your install
import styles from './SessionForm.module.css';

const SessionForm = ({ handleSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [sessionData, setSessionData] = useState({
    title: "",
    description: "",
    category: "",
    startTime: "",
    durationMinutes: "",
    capacity: "",
    postcode: "",
  });

  return (
    <div className={styles.overlay}>
      <motion.div 
        className={styles.modal}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Close Button in the corner */}
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        {step === 1 && <StepOne setStep={() => setStep(2)} />}
        
        {step === 2 && (
          <StepTwo
            sessionData={sessionData}
            setSessionData={setSessionData}
            setStep={() => {
              setStep(3);
              handleSubmit(sessionData); // Send data up to Home.js
            }}
          />
        )}
        
        {step === 3 && <StepThree onClose={onClose} />}
      </motion.div>
    </div>
  );
};

const StepOne = ({ setStep }) => {
  const [topic, setTopic] = useState("");
  const [toThrow, setToThrow] = useState(false);
  const [chat, setChat] = useState("What were you studying?");

  const sayLeave = () => {
    setChat("You hit that out of the park! Let's get you a ship.");
    setTimeout(setStep, 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>👩‍💼 <b>Receptionist:</b> {chat}</p>
      <input
        className={styles.input}
        type="text"
        placeholder="Perhaps something smart"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <br /><br />
      <Book topic={topic} toThrow={toThrow} />
      <br />
      <button
        className={styles.submitBtn}
        onClick={() => {
          if (topic.trim() === "") return;
          setToThrow(true);
          setTimeout(sayLeave, 1500);
        }}
      >
        Yeah I did this
      </button>
    </div>
  );
};

const StepTwo = ({ sessionData, setSessionData, setStep }) => {
  const londonPostcodePattern = "^(E|EC|N|NW|SE|SW|W|WC)([0-9]{1,2}|[0-9][A-Z]|[A-Z][0-9]|[A-Z][0-9][A-Z])\\s?[0-9][A-Z]{2}$";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSessionData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const maxStartTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <motion.form
      style={{ textAlign: "center" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={(e) => {
        e.preventDefault();
        setStep();
      }}
    >
      <h3 style={{ color: '#003b5c', marginBottom: '15px' }}>Mission Details</h3>
      
      <input
        className={styles.input}
        type="text"
        name="title"
        placeholder="NAME YOUR SPACESHIP"
        required
        value={sessionData.title}
        onChange={handleChange}
      />
      <textarea
        className={styles.input}
        name="description"
        placeholder="QUEST DESCRIPTION"
        required
        value={sessionData.description}
        onChange={handleChange}
      />
      <select 
        className={styles.input} 
        name="category" 
        value={sessionData.category} 
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Chill">Chill</option>
        <option value="Active">Active</option>
        <option value="Food & Drink">Food & Drink</option>
        <option value="Culture">Culture</option>
      </select>
      <input
        className={styles.input}
        type="datetime-local"
        name="startTime"
        required
        value={sessionData.startTime}
        onChange={handleChange}
        max={maxStartTime}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          className={styles.input}
          type="number"
          name="durationMinutes"
          placeholder="Duration (min)"
          value={sessionData.durationMinutes}
          onChange={handleChange}
          min="1"
          max="1440"
        />
        <input
          className={styles.input}
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={sessionData.capacity}
          onChange={handleChange}
          min="3"
        />
      </div>
      <input
        className={styles.input}
        type="text"
        name="postcode"
        placeholder="London postcode"
        value={sessionData.postcode}
        onChange={handleChange}
        pattern={londonPostcodePattern}
        title="DESTINATION: Enter a London postcode"
      />
      <button type="submit" className={styles.submitBtn}>Launch Mission</button>
    </motion.form>
  );
};

const StepThree = ({ onClose }) => {
  return (
    <div style={{ textAlign: "center", padding: '20px' }}>
      <h2 style={{ fontSize: '3rem', margin: '0' }}>🚀</h2>
      <p style={{ fontSize: '1.2rem', margin: '15px 0' }}>
        👩‍💼 <b>Receptionist:</b> Enjoy the ride.
      </p>
      <button className={styles.submitBtn} onClick={onClose}>
        Back to Dashboard
      </button>
    </div>
  );
};

const Book = ({ topic, toThrow }) => {
  return (
    <motion.div
      style={{ display: "inline-block", fontSize: "2rem" }}
      animate={toThrow ? { x: 600, y: -400, rotate: 720, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
    >
      📕<span style={{ fontSize: '1rem', verticalAlign: 'middle' }}>{topic}</span>
    </motion.div>
  );
};

export default SessionForm;
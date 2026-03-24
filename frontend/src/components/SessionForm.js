// src/components/SessionForm.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from './SessionForm.module.css';

const SessionForm = ({ handleSubmit, onClose, setBin }) => {
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
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        {step === 1 && <StepOne setStep={() => setStep(2)} setBin={setBin}/>}

        {step === 2 && (
          <StepTwo
            sessionData={sessionData}
            setSessionData={setSessionData}
            setStep={() => {
              setStep(3);
              handleSubmit(sessionData);
            }}
          />
        )}

        {step === 3 && <StepThree onClose={onClose} />}
      </motion.div>
    </div>
  );
};

const StepOne = ({ setStep, setBin }) => {
  const [topic, setTopic] = useState("");
  const [toThrow, setToThrow] = useState(false);
  const [chat, setChat] = useState("What were you studying?");

  const sayLeave = () => {
    setChat("You hit that out of the park! Let's get you a ship.");
    setTimeout(setStep, 2000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.receptionistRow}>
        <span className={styles.receptionistAvatar}>👩‍💼</span>
        <div className={styles.speechBubble}>{chat}</div>
      </div>
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
          setBin(prev => [...prev, { subject: topic, time: Date.now() }])
          setTimeout(sayLeave, 1500);
        }}
      >
        Yeah I did this
      </button>
    </div>
  );
};

const StepTwo = ({ sessionData, setSessionData, setStep }) => {
  const [launching, setLaunching] = useState(false);
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
        setLaunching(true);
        setTimeout(setStep, 850);
      }}
    >
      <DepartureBoard sessionData={sessionData} />

      <Spaceship capacity={sessionData.capacity} launching={launching} />

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

const DepartureBoard = ({ sessionData }) => {
  const formatTime = (iso) => {
    if (!iso) return '-- : --';
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (iso) => {
    if (!iso) return '------';
    const d = new Date(iso);
    return d.toLocaleDateString([], { day: '2-digit', month: 'short' }).toUpperCase();
  };

  return (
    <div className={styles.board}>
      <div className={styles.boardHeader}>DEPARTURES</div>
      <div className={styles.boardRow}>
        <span className={styles.boardLabel}>DEPARTS</span>
        <span className={styles.boardValue}>{formatTime(sessionData.startTime)}</span>
        <span className={styles.boardDate}>{formatDate(sessionData.startTime)}</span>
      </div>
      <div className={styles.boardDivider} />
      <div className={styles.boardRow}>
        <span className={styles.boardLabel}>TO</span>
        <span className={styles.boardValue}>
          {sessionData.postcode || '_ _ _ _ _ _'}
        </span>
      </div>
      <div className={styles.boardRow}>
        <span className={styles.boardLabel}>SHIP</span>
        <span className={styles.boardValue} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          {sessionData.title || '_ _ _ _ _ _ _ _ _'}
        </span>
      </div>
      <div className={styles.boardRow}>
        <span className={styles.boardLabel}>SEATS</span>
        <span className={styles.boardValue}>{sessionData.capacity || '--'}</span>
        <span className={styles.boardDate}>{sessionData.category || '------'}</span>
      </div>
    </div>
  );
};

const Spaceship = ({ capacity, launching }) => {
  const count = Math.min(Math.max(parseInt(capacity) || 0, 0), 60);
  const seats = Array.from({ length: count });

  return (
    <div className={styles.shipViewport}>
      <motion.div
        className={styles.shipWrapper}
        animate={launching
          ? { x: '140vw', opacity: 1 }
          : { x: 0, opacity: 1 }
        }
        transition={launching
          ? { duration: 0.75, ease: [0.4, 0, 1, 1] }
          : { duration: 0 }
        }
      >
        {/* Engines — back (left) */}
        <div className={styles.engineSection}>
          <div className={styles.engineBlock} />
          <div className={styles.engineBlock} />
          <AnimatePresence>
            {launching && (
              <motion.div
                className={styles.exhaustFlame}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1.4, 0.9, 1.2, 1], opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Hull + wings */}
        <div className={styles.hullWrapper}>
          <div className={styles.wingTop} />
          <div className={styles.hull}>
            <div className={styles.cockpit}>
              <div className={styles.cockpitWindow} />
            </div>
            <div className={styles.seatsArea}>
              {seats.map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.seat}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.015 }}
                />
              ))}
              {count === 0 && (
                <span className={styles.noSeats}>set capacity</span>
              )}
            </div>
          </div>
          <div className={styles.wingBottom} />
        </div>

        {/* Nose — front (right) */}
        <div className={styles.nose} />
      </motion.div>
    </div>
  );
};

const StepThree = ({ onClose }) => {
  return (
    <div style={{ textAlign: "center", padding: '20px' }}>
      <h2 style={{ fontSize: '3rem', margin: '0 0 14px' }}>🚀</h2>
      <div className={styles.receptionistRow} style={{ justifyContent: 'center' }}>
        <span className={styles.receptionistAvatar}>👩‍💼</span>
        <div className={styles.speechBubble}>Enjoy the ride.</div>
      </div>
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

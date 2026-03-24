import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from './EditCreatedSessionModal.module.css';

const EditCreatedSessionModal = ({ session, onSave, onClose }) => {
  const [sessionData, setSessionData] = useState({
    title: session.title || "",
    description: session.description || "",
    category: session.category || "",
    startTime: session.startTime || "",
    durationMinutes: session.durationMinutes || "",
    capacity: session.capacity || session.participantLimit || "",
    postcode: session.postcode || "",
  });

  const londonPostcodePattern = "^(E|EC|N|NW|SE|SW|W|WC)([0-9]{1,2}|[0-9][A-Z]|[A-Z][0-9]|[A-Z][0-9][A-Z])\\s?[0-9][A-Z]{2}$";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSessionData((current) => ({ ...current, [name]: value }));
  };

  const maxStartTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(sessionData);
          }}
        >
          <p className={styles.title}>Edit Session</p>

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
          <div className={styles.row}>
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
          <button type="submit" className={styles.submitBtn}>Save Changes</button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditCreatedSessionModal;

import { motion } from "motion/react";
import { useState } from "react";
// import styles from './SessionForm.module.css';

const SessionForm = (onSubmit) => {
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
    <>
      {step === 1 && <StepOne setStep={() => setStep(2)} />}
      {step === 2 && (
        <StepTwo
          sessionData={sessionData}
          setSessionData={setSessionData}
          setStep={() => setStep(3)}
        />
      )}
      {step === 3 && <StepThree />}
    </>
  );
};

const Book = ({ topic, toThrow }) => {
  return (
    <motion.div
      style={{ display: "inline-block" }}
      animate={toThrow ? { x: 3000, y: -400, rotate: 360 } : { x: 0, y: 0 }}
      transition={{ duration: 2 }}
    >
      {" "}
      📕{topic}
    </motion.div>
  );
};

const StepOne = ({ setStep }) => {
  // receptionist
  const [topic, setTopic] = useState("");
  const [toThrow, setToThrow] = useState(false);
  const [chat, setChat] = useState("What were you studying?");
  const sayLeave = () => {
    setChat("You hit that out of the park! Let's get you a ship.");
    setTimeout(setStep, 2000);
  };
  return (
    <>
      <motion.div
        style={{ textAlign: "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <p>
          👩‍💼<b>Receptionist:</b> {chat}{" "}
        </p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <br />

        <Book topic={topic} toThrow={toThrow} />
        <br />
        <motion.button
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          onClick={() => {
            setToThrow(true);
            setTimeout(sayLeave, 2000);
          }}
        >
          Yeah I did this{" "}
        </motion.button>
      </motion.div>
    </>
  );
};
const londonPostcodePattern =
  "^(E|EC|N|NW|SE|SW|W|WC)([0-9]{1,2}|[0-9][A-Z]|[A-Z][0-9]|[A-Z][0-9][A-Z])\\s?[0-9][A-Z]{2}$";

const StepTwo = ({ sessionData, setSessionData, setStep }) => {
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
      transition={{ duration: 1 }}
      onSubmit={(event) => {
        event.preventDefault();
        setStep();
      }}
    >
      <p>Session details</p>
      <input
        type="text"
        name="title"
        placeholder="NAME YOUR SPACESHIP"
        value={sessionData.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="description"
        placeholder="QUEST DESCRIPTION"
        value={sessionData.description}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={sessionData.category}
        onChange={handleChange}
      />
      <br />
      <input
        type="datetime-local"
        name="DEPARTURE:"
        value={sessionData.startTime}
        onChange={handleChange}
        max={maxStartTime}
      />
      <br />
      <input
        type="number"
        name="durationMinutes"
        placeholder="Duration in minutes"
        value={sessionData.durationMinutes}
        onChange={handleChange}
        min="1"
        max="1440"
        step="1"
      />
      <br />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={sessionData.capacity}
        onChange={handleChange}
        min="3"
        step="1"
      />
      <br />
      <input
        type="text"
        name="postcode"
        placeholder="London postcode"
        value={sessionData.postcode}
        onChange={handleChange}
        pattern={londonPostcodePattern}
        title="DESTINATION: Enter a London postcode"
      />
      <br />
      <button type="submit">Continue</button>
    </motion.form>
  );
};

const StepThree = () => {};

export default SessionForm;

import { useMemo, useState } from "react";
import SessionCard from "../components/SessionCard";
import { MOCK_DATA } from "../utils/mockData";
import styles from "./Home.module.css";

import AddSessionButton from "../components/AddSessionButton";
import ViewCreatedSessionButton from "../components/ViewCreatedSessionButton";

/* Move icons outside component so React doesn't warn about dependencies */
const icons = [
  "/icons/bacterias_1184566.png",
  "/icons/clock-tower_444725.png",
  "/icons/stew_5974465.png",
  "/icons/headphone_7487062.png",
  "/icons/spoon-fork_10016076.png",
  "/icons/running_9733249.png",
  "/icons/ice-cream_164257.png",
  "/icons/tree_17013160.png",
  "/icons/star-fruit_8932932.png",
  "/icons/bunting_9324860.png",
  "/icons/camera_11079246.png",
  "/icons/code_8606962.png",
  "/icons/plant-pot_4900495.png",
];

const Home = ({ user }) => {
  const [filter, setFilter] = useState("All");
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [createdSession, setCreatedSession] = useState(null);

  /* Generate decorative icons only once */
  const backgroundIcons = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const icon = icons[Math.floor(Math.random() * icons.length)];

      const side = Math.floor(Math.random() * 4);

      let top;
      let left;

      /* Top edge */
      if (side === 0) {
        top = Math.random() * 8;
        left = Math.random() * 100;
      } else if (side === 1) {
      /* Bottom edge */
        top = 92 + Math.random() * 6;
        left = Math.random() * 100;
      } else if (side === 2) {
      /* Left edge */
        top = Math.random() * 100;
        left = Math.random() * 8;
      } else {
      /* Right edge */
        top = Math.random() * 100;
        left = 92 + Math.random() * 6;
      }

      return {
        id: i,
        src: icon,
        top,
        left,
        rotate: Math.random() * 360,
        opacity: Math.random() * 0.25 + 0.45,
        size: Math.random() * 20 + 25,
      };
    });
  }, []);

  /* Join / Disjoin */
  const handleJoin = (id) => {
    setJoinedSessions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== id) {
          return session;
        }
        if (joinedSessions.includes(id)) {
          return {
            ...session,
            participants: session.participants.filter((n) => n !== user.name),
          };
        } else {
          return {
            ...session,
            participants: [...session.participants, user.name],
          };
        }
      }),
    );
  };

  const handleSubmitSession = (session) => {
    // Add data not created by user
    session = {
      ...session,
      id: 1 + Math.max(sessions.map((s) => s.id)),
      participants: [user],
    };
    // Save it in places
    setJoinedSessions([...joinedSessions, session]);
    setCreatedSession(session);
  };

  /* Filter sessions */
  const [sessions, setSessions] = useState(MOCK_DATA);
  const filteredSessions = sessions.filter((session) => {
    if (filter === "Joined") {
      return joinedSessions.includes(session.id);
    }
    if (filter === "Not Full") {
      return session.participants.length < session.participantLimit;
    }
    return true;
  });

  return (
    <div className={styles.container}>
      {/* Decorative background icons */}
      <div className={styles.backgroundIcons}>
        {backgroundIcons.map((icon) => (
          <img
            key={icon.id}
            src={icon.src}
            alt=""
            className={styles.bgIcon}
            style={{
              top: `${icon.top}%`,
              left: `${icon.left}%`,
              width: `${icon.size}px`,
              transform: `rotate(${icon.rotate}deg)`,
              opacity: icon.opacity,
            }}
          />
        ))}
      </div>

      <h1 className={styles.title}>UCL Peer-Connect</h1>

      <div className={styles.filterWrapper}>
        <label className={styles.label}>Filter By:</label>

        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Sessions</option>
          <option value="Joined">Joined</option>
          <option value="Not Full"> Not Full</option>
        </select>
      </div>

      <div className={styles.list}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              joined={joinedSessions.includes(s.id)}
              onJoin={handleJoin}
              onSelect={setSelectedSession}
            />
          ))
        ) : (
          <p className={styles.empty}>No {filter} sessions found.</p>
        )}
      </div>

      {/* Session Popup */}
      {selectedSession && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedSession(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedSession.title}</h2>

            <p>
              <strong>Category:</strong> {selectedSession.category}
            </p>
            <p>
              <strong>Location:</strong> {selectedSession.location}
            </p>
            <p>
              <strong>Description:</strong> {selectedSession.description}
            </p>
            <p>
              <strong>Duration:</strong> {selectedSession.duration} minutes
            </p>
            <p>
              <strong>Spots:</strong> {selectedSession.participants.length}/
              {selectedSession.participantLimit}
            </p>
            <p>
              <strong>Participants:</strong>{" "}
              {selectedSession.participants.join(", ")}
            </p>
            <p>
              <strong>Contact:</strong> {selectedSession.hostContact}
            </p>

            <button onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        </div>
      )}
      {createdSession ? (
        <ViewCreatedSessionButton
          onSelect={() => setSelectedSession(createdSession)}
        />
      ) : (
        <AddSessionButton handleSubmit={handleSubmitSession} />
      )}
    </div>
  );
};

export default Home;

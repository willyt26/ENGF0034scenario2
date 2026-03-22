import React, { useMemo, useState } from "react";
import SessionCard from "../components/SessionCard";
import SessionForm from "../components/SessionForm"; // Added this!
import { MOCK_DATA } from "../utils/mockData";
import styles from "./Home.module.css";
import AddSessionButton from "../components/AddSessionButton";
import ViewCreatedSessionButton from "../components/ViewCreatedSessionButton";

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
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [createdSession, setCreatedSession] = useState(null);
  const [sessions, setSessions] = useState(MOCK_DATA);
  const [showForm, setShowForm] = useState(false); 

  const backgroundIcons = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const side = Math.floor(Math.random() * 4);
      let top, left;
      if (side === 0) { top = Math.random() * 8; left = Math.random() * 100; }
      else if (side === 1) { top = 92 + Math.random() * 6; left = Math.random() * 100; }
      else if (side === 2) { top = Math.random() * 100; left = Math.random() * 8; }
      else { top = Math.random() * 100; left = 92 + Math.random() * 6; }

      return {
        id: i, src: icon, top, left,
        rotate: Math.random() * 360,
        opacity: Math.random() * 0.25 + 0.45,
        size: Math.random() * 20 + 25,
      };
    });
  }, []);

  const handleJoin = (id) => {
    setJoinedSessions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== id) return session;
        if (joinedSessions.includes(id)) {
          return { ...session, participants: session.participants.filter((n) => n !== user.name) };
        } else {
          return { ...session, participants: [...session.participants, user.name] };
        }
      })
    );
  };

  const handleSubmitSession = (sessionData) => {
    const newSession = {
      ...sessionData,
      id: Date.now(),
      participants: [user.name], 
      category: sessionData.category || "Social",
      hostContact: user.email,
      participantLimit: sessionData.capacity // Mapping capacity from form to data
    };
    
    setSessions([newSession, ...sessions]); 
    setJoinedSessions([...joinedSessions, newSession.id]);
    setCreatedSession(newSession);
    setShowForm(false); 
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesCategory = categoryFilter === "All" || session.category === categoryFilter;
    let matchesStatus = true;
    if (statusFilter === "Joined") {
      matchesStatus = joinedSessions.includes(session.id);
    } else if (statusFilter === "Not Full") {
      matchesStatus = session.participants.length < (session.participantLimit || 100);
    }
    return matchesCategory && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.backgroundIcons}>
        {backgroundIcons.map((icon) => (
          <img
            key={icon.id}
            src={icon.src}
            alt=""
            className={styles.bgIcon}
            style={{
              position: 'absolute',
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
        <div className={styles.filterGroup}>
          <label className={styles.label}>Activity:</label>
          <select
            className={styles.select}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Chill">Chill</option>
            <option value="Active">Active / Sports</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Culture">Culture</option>
            <option value="Creative">Creative</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Status:</label>
          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Sessions</option>
            <option value="Joined">My Sessions</option>
            <option value="Not Full">Space Available</option>
          </select>
        </div>
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
          <p className={styles.empty}>No {categoryFilter} sessions found with status: {statusFilter}.</p>
        )}
      </div>

      {selectedSession && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSession(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedSession.title}</h2>
            <p><strong>Category:</strong> {selectedSession.category}</p>
            <p><strong>Location:</strong> {selectedSession.location || "Bloomsbury"}</p>
            <p><strong>Description:</strong> {selectedSession.description}</p>
            <p><strong>Spots:</strong> {selectedSession.participants.length}/{selectedSession.participantLimit}</p>
            <p><strong>Participants:</strong> {selectedSession.participants.join(", ")}</p>
            <button className={styles.closeBtn} onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        </div>
      )}

      {showForm && (
        <SessionForm 
          handleSubmit={handleSubmitSession} 
          onClose={() => setShowForm(false)} 
        />
      )}

      {createdSession ? (
        <ViewCreatedSessionButton onSelect={() => setSelectedSession(createdSession)} />
      ) : (
        <AddSessionButton onClick={() => setShowForm(true)} /> 
      )}
    </div>
  );
};

export default Home;
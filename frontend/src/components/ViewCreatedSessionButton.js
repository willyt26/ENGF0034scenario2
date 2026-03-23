import styles from "./ViewCreatedSessionButton.module.css";
import { User } from 'lucide-react';
// const AddSessionButton = () => {
//   const [createOpen, setCreateOpen] = useState(false);

//   return createOpen ? (
//     <SessionForm />
//   ) : (
// <button
//   className={styles.fab}
//   onClick={() => setCreateOpen(true)}
//   title="Host a Session"
// >
//   +
// </button>
//   );
// }; // src/components/SessionCard.js

const ViewCreatedSessionButton = ({ onSelect }) => {
  return (
    <button className={styles.fab} onClick={onSelect} title="Edit Created Session">
      <User/>
    </button>
  );
};

export default ViewCreatedSessionButton;

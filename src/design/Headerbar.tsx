import { MdOutlineHistory } from 'react-icons/md';
import { FaBell } from 'react-icons/fa6';
import { RiMenuLine } from 'react-icons/ri';
import styles from './Headerbar.module.css';

export default function Headerbar() {
  return (
    <div className={styles.headerbar}>
      <MdOutlineHistory className={styles.history} />
      <header className={styles.title}>GomGom Diary 🐻💭</header>
      <FaBell className={styles.noNewMessage} />
      <RiMenuLine className={styles.menu} />
    </div>
  );
}

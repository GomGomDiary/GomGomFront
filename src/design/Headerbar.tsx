import { MdOutlineHistory } from 'react-icons/md';
import { FaBell } from 'react-icons/fa6';
import { RiMenuLine } from 'react-icons/ri';
import styles from './Headerbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { questionerAtom } from '@/store/create/questioner';
import { questionNumberAtom } from '@/store/create/questionNumber';

const Headerbar = () => {
  const navigate = useNavigate();

  const setQuestioner = useSetAtom(questionerAtom);
  const setQuestionNumber = useSetAtom(questionNumberAtom);

  const handleGoToMain = () => {
    navigate('/');
    setQuestioner('');
    setQuestionNumber(5);
  };

  return (
    <div className={styles.headerbar}>
      <MdOutlineHistory className={styles.history} />
      <header className={styles.title} onClick={handleGoToMain}>
        GomGom Diary 🐻💭
      </header>
      <FaBell className={styles.noNewMessage} />
      <RiMenuLine className={styles.menu} />
    </div>
  );
};

export default Headerbar;

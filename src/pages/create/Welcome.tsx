import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './Welcome.module.css';
import { useAtom } from 'jotai';
import { questionerAtom } from '@/store/create/questioner';
import { ChangeEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Welcome = () => {
  const navigate = useNavigate();
  const [questioner, setQuestioner] = useAtom(questionerAtom);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestioner(e.target.value);
  };

  const [isNameWritten, setIsNameWritten] = useState(false);

  const handleSubmitName = () => {
    if (questioner) {
      setQuestioner(questioner);
      setIsExiting(true);
      setTimeout(() => {
        navigate('/question-number');
      }, 1000);
    } else {
      nameInputRef.current?.focus();
      setIsNameWritten(true);
    }
  };

  const pageVariants = {
    initial: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1.2,
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.Welcome}
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className={styles.title}>
            <div>🐻💭</div>
            <p>상대에 대해 곰곰이 생각하고</p>
            <p>답하는 곰곰 다이어리</p>
          </div>
          <section className={styles.section}>
            <div>반갑다곰!</div>
            <p>질문을 만들고 특별한 암호를 설정한 뒤</p>
            <p>소중한 친구, 가족, 연인과 공유해서</p>
            <p>많은 답변과 추억을 쌓아보라곰!</p>
          </section>
          <div className={styles.nameInput}>
            <Input
              value={questioner}
              onChange={handleWriteName}
              placeholder="10자 이내로 이름을 입력하세요."
              ref={nameInputRef}
              maxLength={10}
            />
            <Button
              text={'시작'}
              variant="default"
              onClick={handleSubmitName}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Welcome;

import { questionerAtom } from '@/store/create/questioner';
import styles from './QuestionNumber.module.css';
import { Button } from '@/components';
import { questionNumberAtom } from '@/store/create/questionNumber';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const QuestionNumber = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const [questionNum, setQuestionNum] = useAtom(questionNumberAtom);

  const handleNumMinus = () => {
    if (questionNum > 3) {
      setQuestionNum(questionNum - 1);
    }
  };

  const handleNumPlus = () => {
    if (questionNum < 10) {
      setQuestionNum(questionNum + 1);
    }
  };

  const pageVariants = {
    initial: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1.0,
  };

  const goToQuestionList = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/question-list');
    }, 1000);
  };

  const [isExiting, setIsExiting] = useState(false);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.questionNumber}
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className={styles.title}>
            <p>다이어리의 질문을 만들어보자곰!</p>
            <p>최소 3개부터 최대 10개로</p>
            <p>질문 개수를 정해달라곰!</p>
          </div>
          <div className={styles.circle}>
            <button className={styles.minus} onClick={handleNumMinus}>
              -
            </button>
            <div className={styles.number}>{questionNum}</div>
            <button className={styles.plus} onClick={handleNumPlus}>
              +
            </button>
          </div>
          <Button text={'다음'} variant="default" onClick={goToQuestionList} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionNumber;

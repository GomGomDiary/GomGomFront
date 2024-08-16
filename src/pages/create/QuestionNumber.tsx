import { questionerAtom } from '@/store/create/questioner';
import styles from './QuestionNumber.module.css';
import Button from '@/components/Button';
import { questionNumberAtom } from '@/store/create/questionNumber';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionNumber = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

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

  const goToQuestionList = () => {
    navigate('/question-list');
  };

  return (
    <div className={styles.questionNumber}>
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
    </div>
  );
};

export default QuestionNumber;

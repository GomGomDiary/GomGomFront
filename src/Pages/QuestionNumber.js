import React from 'react';
import { useRecoilState } from 'recoil';
import { QuestionNum } from '../store/QuestionNum';
import Btn from '../components/Btn';
import Styles from './QuestionNumber.module.css';

const QuestionNumber = ({ onNextStep }) => {
  const [questionNumber, setQuestionNumber] = useRecoilState(QuestionNum);

  const numMinus = () => {
    if (questionNumber > 3) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const numPlus = () => {
    if (questionNumber < 10) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const goToQuestionList = () => {
    onNextStep();
  };

  return (
    <div className={Styles.QuestionNumber}>
      <div className={Styles.title}>
        최소 3개 ~ 최대 10개로<p></p>질문 개수를 정해주세요.
      </div>
      <div className={Styles.circle}>
        <button className={Styles.minus} onClick={numMinus}>
          -
        </button>
        <div className={Styles.number}>{questionNumber}</div>
        <button className={Styles.plus} onClick={numPlus}>
          +
        </button>
      </div>
      <Btn text={'다음'} onClick={goToQuestionList} />
    </div>
  );
};

export default QuestionNumber;

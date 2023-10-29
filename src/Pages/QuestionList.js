import React, { useState } from 'react';
import Styles from './QuestionList.module.css';

import { useRecoilState } from 'recoil';
import { QuestionNum } from '../store/QuestionNum';
import Btn from '../components/Btn';

export const QuestionList = () => {
  const [questionNumber, setQuestionNumber] = useRecoilState(QuestionNum);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questionArr = [
    '나는 어떤 사람이야?',
    '우리는 어떤 점이 비슷하고 달라?',
    '내가 가장 좋아하는 음식은?',
    '내가 너에게 준 좋은 영향은?',
    '10년 후 우리는 어떤 모습일까?',
    '나에게 하고 싶은 말 있어?',
    '나랑 가보고 싶은 곳 있어?',
    '네가 생각하는 나의 장점은 뭐야?',
    '나와의 추억 중 가장 소중한 추억은?',
    '나에게 추천하고 싶은 노래는?',
  ];

  const selectedQuestion = questionArr.slice(0, questionNumber + 1);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = selectedQuestion[currentQuestionIndex];

  return (
    <div>
      <div className={Styles.QuestionList} key={currentQuestionIndex}>
        {currentQuestionIndex < questionNumber && (
          <>
            <div className={Styles.title}>
              질문이 마음에 들면 다음 문제를 누르고,<p></p>
              마음에 들지 않으면 직접 수정하세요!
            </div>
            <p>Q.{currentQuestionIndex + 1}</p>
            <p>{currentQuestion}</p>
          </>
        )}
      </div>
      {currentQuestionIndex < questionNumber && (
        <Btn text={'다음 문제'} onClick={handleNextQuestion} />
      )}
    </div>
  );
};

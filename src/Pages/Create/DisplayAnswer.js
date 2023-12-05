import React from 'react';
import Styles from './DisplayAnswer.module.css';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';

import { Answer } from '../../store/Create/Answer';
import { Question } from '../../store/Create/Question';
import { useRecoilValue } from 'recoil';

const DisplayAnswer = () => {
  const answer = useRecoilValue(Answer);
  const question = useRecoilValue(Question);

  const navigate = useNavigate();

  const arr = [];

  for (let i = 0; i < answer.answers.length; i++) {
    arr.push(`${i + 1}번 `);
    arr.push(`Q: ${question.question[i]}`);
    arr.push(`A: ${answer.answers[i]}`);
  }

  return (
    <div className={Styles.DisplayAnswerContainer}>
      <div className={Styles.DisplayAnswer}>
        <div className={Styles.answerer}>{answer.answerer}님의 답장💌</div>
        <div className={Styles.answer}>
          {arr.map((num, idx) => (
            <div key={idx}>{num}</div>
          ))}
        </div>
        <Btn text={'뒤로 가기'} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default DisplayAnswer;

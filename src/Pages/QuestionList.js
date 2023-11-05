import React, { useState } from 'react';
import Styles from './QuestionList.module.css';
import { useRecoilState } from 'recoil';
import { QuestionNum } from '../store/QuestionNum';
import Btn from '../components/Btn';
import Input from '../components/Input';

export const QuestionList = ({ onNextStep }) => {
  const [questionNumber] = useRecoilState(QuestionNum);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isEdited, setIsEdited] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');

  const questionArr = [
    '나는 어떤 사람이야?',
    '우리는 어떤 점이 비슷하고 달라?',
    '내가 가장 좋아하는 음식은?',
    '내가 너에게 준 좋은 영향은?',
    '10년 후 우리는 어떤 모습일까?',
    '나에게 하고 싶은 말 있어?',
    '나랑 가보고 싶은 곳 있어?',
    '네가 생각하는 나의 장점은 뭐야?',
    '나와 가장 소중한 추억은?',
    '나에게 추천하고 싶은 노래는?',
  ];

  const selectedQuestion = questionArr.slice(0, questionNumber);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(currentQuestionIndex);
    } else {
      onNextStep();
      console.log(selectedQuestion);
    }
  };

  const editedList = [...selectedQuestion];

  const modifyQuestion = () => {
    setIsEdited(true);
    setEditedQuestion(editedQuestion);
  };

  const saveQuestion = () => {
    setIsEdited(false);
    console.log(editedQuestion);
  };

  const currentQuestion = editedList[currentQuestionIndex];

  return (
    <div className={Styles.QuestionListContainer}>
      <div className={Styles.QuestionList} key={currentQuestionIndex}>
        {currentQuestionIndex < questionNumber && (
          <>
            <div className={Styles.top}>
              <div className={Styles.title}></div>
              <div className={Styles.progressBar}>
                <div className={Styles.progress}></div>
              </div>
            </div>
            <div className={Styles.middle}>
              <div className={Styles.questionContent}>
                <p>✉️ {currentQuestionIndex + 1}번째 질문 ✉️</p>
                {isEdited ? (
                  <Input
                    placeholder="질문을 수정하세요."
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                  />
                ) : (
                  <p>{currentQuestion}</p>
                )}
                <Btn text={'다음 질문'} onClick={handleNextQuestion} />
              </div>
            </div>
            <div className={Styles.botton}>
              {!isEdited ? (
                <button className={Styles.modifyBtn} onClick={modifyQuestion}>
                  수정하기
                </button>
              ) : (
                <button className={Styles.modifyBtn} onClick={saveQuestion}>
                  수정완료
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionList;

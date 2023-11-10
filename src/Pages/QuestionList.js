import React, { useState, useMemo } from 'react';

import Styles from './QuestionList.module.css';
import { useRecoilState } from 'recoil';
import { QuestionNum } from '../store/QuestionNum';
import { QuestionArr } from '../store/QuestionArr';
import Btn from '../components/Btn';
import WhiteBtn from '../components/WhiteBtn';
import Input from '../components/Input';

export const QuestionList = ({ onNextStep, onPreviousStep }) => {
  const [questionNumber] = useRecoilState(QuestionNum);
  const [questionArr, setQuestionArr] = useRecoilState(QuestionArr);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isEdited, setIsEdited] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');

  const selectedQuestion = questionArr.slice(0, questionNumber);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onNextStep();
      setQuestionArr(updatedList);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onPreviousStep();
    }
  };

  const [editedList, setEditedList] = useState([...selectedQuestion]);
  const updatedList = [...editedList];

  const modifyQuestion = () => {
    setIsEdited(true);
    setEditedQuestion('');
  };

  const saveQuestion = () => {
    setIsEdited(false);

    updatedList.splice(currentQuestionIndex, 1, editedQuestion);

    setEditedList(updatedList);
    setQuestionArr(updatedList);
  };

  const currentQuestion = editedList[currentQuestionIndex];

  const calculateProgress = useMemo(() => {
    return ((currentQuestionIndex + 1) / selectedQuestion.length) * 100;
  }, [currentQuestionIndex, selectedQuestion.length]);

  return (
    <div className={Styles.QuestionListContainer}>
      <div className={Styles.QuestionList} key={currentQuestionIndex}>
        {currentQuestionIndex < questionNumber && (
          <>
            <div className={Styles.top}>
              <div className={Styles.title}></div>
              <div className={Styles.progressBar}>
                <div
                  className={Styles.progress}
                  style={{ width: `${calculateProgress}%` }}
                ></div>
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
                  <span>{currentQuestion}</span>
                )}
                <div className={Styles.Btns}>
                  <WhiteBtn text={'이전으로'} onClick={handlePrevious} />
                  <Btn text={'다음 질문'} onClick={handleNextQuestion} />
                </div>
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

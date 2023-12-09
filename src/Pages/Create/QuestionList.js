import React, { useState, useMemo, useRef, useEffect } from 'react';

import Styles from './QuestionList.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { QuestionNum } from '../../store/Create/QuestionNum';
import { QuestionArr } from '../../store/Create/QuestionArr';
import { OriginQuestionArr } from '../../store/Create/OriginQuestionArr';
import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import Input from '../../components/Input';
import CustomModal from '../../components/CustomModal';

export const QuestionList = ({ onNextStep, onPreviousStep }) => {
  const [questionNumber] = useRecoilState(QuestionNum);
  const [questionArr, setQuestionArr] = useRecoilState(QuestionArr);

  /* 원래 배열에서 개수만 자른 거 */
  const [originQuestionArr, setOriginQuestionArr] =
    useRecoilState(OriginQuestionArr);
  const originQuestion = originQuestionArr.slice(0, questionNumber);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');

  const selectedQuestion = questionArr.slice(0, questionNumber);

  const [editedList, setEditedList] = useState([...selectedQuestion]);
  const updatedList = [...editedList];

  const editedQuestionInputRef = useRef(null);

  const [isModified, setIsModified] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1 && !isEditing) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsModified(false);
    } else if (isEditing) {
      setIsModified(true);
      editedQuestionInputRef.current.focus();
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

  const modifyQuestion = () => {
    setIsEdited(true);
    setIsEditing(true);
    setEditedQuestion('');
  };

  useEffect(() => {
    if (isEdited) {
      editedQuestionInputRef.current.focus();
    }
  }, [isEdited]);

  const saveQuestion = () => {
    if (!editedQuestion) {
      setIsCompleted(true);
      setIsEditing(true);
      setIsEdited(true);
      editedQuestionInputRef.current.focus();
    } else {
      updatedList.splice(currentQuestionIndex, 1, editedQuestion);
      setIsCompleted(false);
      setIsEditing(false);
      setIsEdited(false);
    }
    setEditedList(updatedList);
    setQuestionArr(updatedList);
  };

  const currentQuestion = editedList[currentQuestionIndex];

  const calculateProgress = useMemo(() => {
    return ((currentQuestionIndex + 1) / selectedQuestion.length) * 100;
  }, [currentQuestionIndex, selectedQuestion.length]);

  const handleModalClose = () => {
    setIsModified(false);
    setIsCompleted(false);
  };

  return (
    <div className={Styles.QuestionListContainer}>
      <div className={Styles.QuestionList} key={currentQuestionIndex}>
        {currentQuestionIndex < questionNumber && (
          <>
            {isModified && (
              <CustomModal
                message={'질문을 완성해주세요.'}
                updateModal={handleModalClose}
              />
            )}
            {isCompleted && (
              <CustomModal
                message={'질문을 완성해주세요.'}
                updateModal={handleModalClose}
              />
            )}
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
                    placeholder="100자 내외로 질문을 수정하세요."
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    ref={editedQuestionInputRef}
                    maxLength={100}
                  />
                ) : (
                  <span className={Styles.currentQuestion}>
                    {currentQuestion}
                  </span>
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

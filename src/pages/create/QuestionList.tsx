import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './QuestionList.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { questionNumberAtom } from '@/store/create/questionNumber';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { questionArrAtom } from '@/store/create/questionArr';
import { originQuestionArrAtom } from '@/store/create/originQuestionArr';
import Dialog from '@/components/Dialog';
import { questionerAtom } from '@/store/create/questioner';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const questionNumber = useAtomValue(questionNumberAtom);
  const setQuestionArr = useSetAtom(questionArrAtom);
  const originQuestionArr = useAtomValue(originQuestionArrAtom);
  const selectedQuestion = originQuestionArr.slice(0, questionNumber);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');

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
    } else {
      setQuestionArr(updatedList);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      navigate('/question-number');
    }
    if (currentQuestionIndex > 0 && !isEdited) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleModifyQuestion = () => {
    setIsEdited(true);
    setIsEditing(true);
    setEditedQuestion('');
  };

  const handleSaveQuestion = () => {
    if (!editedQuestion) {
      setIsCompleted(true);
      setIsEditing(true);
      setIsEdited(true);
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
    <div className={styles.QuestionListContainer}>
      <div className={styles.QuestionList}>
        {currentQuestionIndex < questionNumber && (
          <>
            {isModified && (
              <Dialog
                message="질문을 완성해주세요."
                updateModal={handleModalClose}
              />
            )}
            {isCompleted && (
              <Dialog
                message={'질문을 완성해주세요.'}
                updateModal={handleModalClose}
              />
            )}
            <div className={styles.top}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${calculateProgress}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.middle}>
              <div className={styles.questionContent}>
                <p>✉️ {currentQuestionIndex + 1}번째 질문 ✉️</p>
                {isEdited ? (
                  <div className={styles.editedQuestion}>
                    <Input
                      placeholder="100자 내외로 질문을 수정하세요."
                      value={editedQuestion}
                      onChange={e => setEditedQuestion(e.target.value)}
                      ref={editedQuestionInputRef}
                      maxLength={100}
                    />
                    <div className={styles.editedQuestionLength}>
                      {editedQuestion.length}/100
                    </div>
                  </div>
                ) : (
                  <span className={styles.currentQuestion}>
                    {currentQuestion}
                  </span>
                )}
                <div className={styles.Btns}>
                  {!isEdited ? (
                    <Button
                      text={'질문 수정하기'}
                      variant="default"
                      onClick={handleModifyQuestion}
                    />
                  ) : (
                    <Button
                      text={'수정 완료'}
                      variant="default"
                      onClick={handleSaveQuestion}
                    />
                  )}
                  <Button
                    text={'이전으로'}
                    variant="white"
                    onClick={handlePreviousQuestion}
                  />
                  <Button
                    text={'다음 질문'}
                    variant="white"
                    onClick={handleNextQuestion}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default QuestionList;

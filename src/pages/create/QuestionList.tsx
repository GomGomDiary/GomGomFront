import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './QuestionList.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { questionNumberAtom } from '@/store/create/questionNumber';
import { Button, Dialog, Input } from '@/components';
import { questionArrAtom } from '@/store/create/questionArr';
import { originQuestionArrAtom } from '@/store/create/originQuestionArr';

import { questionerAtom } from '@/store/create/questioner';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionList = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const questionNumber = useAtomValue(questionNumberAtom);
  const setQuestionArr = useSetAtom(questionArrAtom);
  const originQuestionArr = useAtomValue(originQuestionArrAtom);
  const selectedQuestion = originQuestionArr.slice(0, questionNumber);

  const [editedList, setEditedList] = useState([...selectedQuestion]);
  const updatedList = [...editedList];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const editedQuestionInputRef = useRef(null);

  const [isModified, setIsModified] = useState(false);

  const [back, setBack] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const questionVariant = {
    entry: (back: number) => ({
      x: back ? -200 : 200,
      opacity: 0,
      transition: { duration: 0.6 },
      scale: 1,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
      scale: 1,
    },
    exit: (back: number) => ({
      x: back ? 200 : -200,
      opacity: 0,
      scale: 1,
      transition: { duration: 0.6 },
    }),
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1 && !isEditing) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setBack(false);
    } else if (isEditing) {
      setIsModified(true);
    } else {
      setEditedList(updatedList);
      setQuestionArr(updatedList);
      setIsExiting(true);
      setTimeout(() => {
        navigate('/challenge');
      }, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0 && !isEditing) {
      setIsExiting(true);
      setTimeout(() => {
        navigate('/question-number');
      }, 1000);
    } else if (currentQuestionIndex > 0 && !isEditing) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setBack(true);
    } else {
      setIsModified(true);
    }
  };

  const handleModifyQuestion = () => {
    setIsEditing(true);
    setEditedQuestion('');
  };

  const handleSaveQuestion = () => {
    if (!editedQuestion) {
      setIsModified(true);
      setIsEditing(true);
    } else {
      updatedList.splice(currentQuestionIndex, 1, editedQuestion);
      setIsModified(false);
      setIsEditing(false);
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
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.questionListContainer}
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className={styles.questionList}>
            {currentQuestionIndex < questionNumber && (
              <>
                {isModified && (
                  <Dialog
                    message="질문을 완성해주세요."
                    updateModal={handleModalClose}
                  />
                )}
                <AnimatePresence mode="wait" custom={back}>
                  <motion.div
                    custom={back}
                    key={currentQuestionIndex}
                    initial="entry"
                    animate="center"
                    exit="exit"
                    variants={questionVariant}
                    className={styles.top}
                  >
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{ width: `${calculateProgress}%` }}
                      ></div>
                    </div>

                    <div className={styles.middle}>
                      <div className={styles.questionContent}>
                        <p>✉️ {currentQuestionIndex + 1}번째 질문 ✉️</p>
                        {isEditing ? (
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
                        <div className={styles.btns}>
                          {!isEditing ? (
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
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuestionList;

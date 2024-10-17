import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import {
  originQuestionArrAtom,
  questionArrAtom,
  questionerAtom,
  questionNumberAtom,
} from '@/store/create';

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
  const [isExiting, setIsExiting] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1 && !isEditing) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        <QuestionListContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <ListContent>
            {currentQuestionIndex < questionNumber && (
              <>
                {isModified && (
                  <Modal
                    message="질문을 완성해주세요."
                    updateModal={handleModalClose}
                  />
                )}
                <Progressbar>
                  <Progress width={calculateProgress} />
                </Progressbar>
                <QuestionContainer>
                  <Title>✉️ {currentQuestionIndex + 1}번째 질문 ✉️</Title>
                  {isEditing ? (
                    <EditedQuestion>
                      <Input
                        placeholder="100자 내외로 질문을 수정하세요."
                        value={editedQuestion}
                        onChange={e => setEditedQuestion(e.target.value)}
                        ref={editedQuestionInputRef}
                        maxLength={100}
                      />
                      <EditedQuestionLength>
                        {editedQuestion.length}/100
                      </EditedQuestionLength>
                    </EditedQuestion>
                  ) : (
                    <CurrentQuestion>{currentQuestion}</CurrentQuestion>
                  )}
                  <Buttons>
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
                  </Buttons>
                </QuestionContainer>
              </>
            )}
          </ListContent>
        </QuestionListContainer>
      )}
    </AnimatePresence>
  );
};

export default QuestionList;

const QuestionListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  gap: 50px;
`;

const Progressbar = styled.div`
  width: 90%;
  height: 20px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: var(--border-color);
`;

const Progress = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 20px;
  background-color: var(--point-color);
  transition: width 0.6s ease-in-out;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  font-size: 20px;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  color: var(--point-color);
`;

const EditedQuestion = styled.div``;

const EditedQuestionLength = styled.div`
  font-size: 12px;
  padding-top: 10px;
  text-align: right;
`;

const CurrentQuestion = styled.div`
  width: 80%;
  word-break: break-all;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
`;

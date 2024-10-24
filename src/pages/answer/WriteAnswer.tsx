import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import { answerArrAtom, answererTokenAtom } from '@/store/answer';
import { EventTrigger } from '@/utils';
import { instance } from '@/utils';

export const WriteAnswer = () => {
  const [isExiting, setIsExiting] = useState(false);
  const { diaryId } = useParams();

  const answererToken = useAtomValue(answererTokenAtom);
  const axiosInstance = instance(answererToken);
  const navigate = useNavigate();

  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionArr, setQuestionArr] = useState([]);
  const AnswerInputRef = useRef<HTMLInputElement | null>(null);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [AnswerArr, setAnswerArr] = useAtom(answerArrAtom);
  const [isAnswerWritten, setIsAnswerWritten] = useState(false);

  useEffect(() => {
    if (!answererToken) {
      navigate(`/diary/${diaryId}`);
    }
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const Answer = await axiosInstance.get(`diary/question/${diaryId}`);
        setQuestionArr(Answer.data.question);
        setQuestionNumber(Answer.data.questionLength);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, []);

  const handleModalClose = () => {
    setIsAnswerWritten(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questionNumber - 1 && answer) {
      setAnswerArr([...AnswerArr, answer]);
      setAnswer('');
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else if (!answer) {
      setIsAnswerWritten(true);
      AnswerInputRef.current?.focus();
    } else {
      setAnswerArr([...AnswerArr, answer]);
      EventTrigger({
        action: '답장 완료하기',
        category: 'success',
        label: '답장 완료하기',
        value: 1,
      });
      setIsExiting(true);
      setTimeout(() => {
        navigate('/done');
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      const newArr = [...AnswerArr];
      newArr.splice(currentQuestionIdx - 1, 1);
      setAnswerArr(newArr);
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    } else {
      setIsExiting(true);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };

  const handleSkipQuestion = () => {
    const skip = '생략했어요.';
    if (currentQuestionIdx < questionNumber - 1) {
      setAnswer('');
      setAnswerArr([...AnswerArr, skip]);
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setAnswerArr([...AnswerArr, skip]);
      setIsExiting(true);

      setTimeout(() => {
        navigate(`/done/${diaryId}`);
      }, 1000);
    }
  };

  const currentQuestion = questionArr[currentQuestionIdx];

  const calculateProgress = useMemo(() => {
    return ((currentQuestionIdx + 1) / questionArr.length) * 100;
  }, [currentQuestionIdx, questionArr.length]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <WriteAnswerContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <ProgressWrapper>
            <ProgressBar>
              <Progress width={calculateProgress} />
            </ProgressBar>
          </ProgressWrapper>

          <AnswerContent>
            <QuestionNumber>
              ✉️ {currentQuestionIdx + 1}번째 질문 ✉️
            </QuestionNumber>
            <Question>{currentQuestion}</Question>
            <AnswerInputWrapper>
              <Input
                placeholder="100자 내외로 답장을 입력하세요."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                ref={AnswerInputRef}
                maxLength={100}
              />
              <AnswerLength>{answer.length}/100</AnswerLength>
            </AnswerInputWrapper>
            <Buttons>
              <Button
                text={'<< 이전으로'}
                variant="default"
                onClick={handlePrevious}
              />
              <Button
                text={'다음 질문 >>'}
                variant="default"
                onClick={handleNextQuestion}
              />
              {isAnswerWritten && (
                <Modal
                  message={'답장을 작성해주세요.'}
                  updateModal={handleModalClose}
                />
              )}

              <Button
                onClick={handleSkipQuestion}
                text={'넘어가기'}
                variant="white"
              />
            </Buttons>
          </AnswerContent>
        </WriteAnswerContainer>
      )}
    </AnimatePresence>
  );
};

const WriteAnswerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
  margin-top: 15px;
`;

const AnswerContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  gap: 50px;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 20px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: var(--border-color);
`;

const Progress = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 20px;
  border-radius: 20px;
  background-color: var(--point-color);
  transition: width 0.6s ease-in-out;
`;

const QuestionNumber = styled.div`
  color: var(--point-color);
  font-size: 20px;
`;

const Question = styled.div`
  width: 80%;
  font-size: 20px;
  word-break: break-all;
`;

const AnswerInputWrapper = styled.div``;

const AnswerLength = styled.div`
  font-size: 12px;
  padding-top: 10px;
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

import { questionerAtom } from '@/store/create/questioner';
import { Button } from '@/components';
import { questionNumberAtom } from '@/store/create/questionNumber';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const QuestionNumber = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const [questionNum, setQuestionNum] = useAtom(questionNumberAtom);

  const handleNumMinus = () => {
    if (questionNum > 3) {
      setQuestionNum(questionNum - 1);
    }
  };

  const handleNumPlus = () => {
    if (questionNum < 10) {
      setQuestionNum(questionNum + 1);
    }
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

  const handlePrevious = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const goToQuestionList = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/question-list');
    }, 1000);
  };

  const [isExiting, setIsExiting] = useState(false);

  return (
    <AnimatePresence>
      {!isExiting && (
        <QuestionNumberContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          key="QuestionNumber"
        >
          <Title>
            <Subtitle>다이어리의 질문을 만들어보자곰!</Subtitle>
            <Description>
              최소 3개부터 최대 10개로
              <br />
              질문 개수를 정해달라곰!
            </Description>
          </Title>
          <Circle>
            <MinusButton onClick={handleNumMinus}>-</MinusButton>
            <QuestionCounter>{questionNum}</QuestionCounter>
            <PlusButton onClick={handleNumPlus}>+</PlusButton>
          </Circle>
          <Buttons>
            <Button
              text={'이전으로'}
              variant="white"
              onClick={handlePrevious}
            />
            <Button
              text={'다음'}
              variant="default"
              onClick={goToQuestionList}
            />
          </Buttons>
        </QuestionNumberContainer>
      )}
    </AnimatePresence>
  );
};

export default QuestionNumber;

const QuestionNumberContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: center;
  line-height: 1.6;
`;

const Subtitle = styled.div`
  font-size: 20px;
  color: var(--point-color);
`;

const Description = styled.div``;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CircleButton = styled(Circle)`
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 50px;
`;

const MinusButton = styled(CircleButton)`
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: var(--main-color);
    transform: scale(1.2);
  }
`;

const PlusButton = styled(MinusButton)``;

const QuestionCounter = styled(CircleButton)`
  width: 100px;
  height: 100px;
  font-size: 28px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;

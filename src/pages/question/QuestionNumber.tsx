import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import { questionerAtom, questionNumberAtom } from '@/store/question';

export const QuestionNumber = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const [questionNumber, setQuestionNum] = useAtom(questionNumberAtom);

  const handleNumMinus = () => {
    if (questionNumber > 3) {
      setQuestionNum(questionNumber - 1);
    }
  };

  const handleNumPlus = () => {
    if (questionNumber < 10) {
      setQuestionNum(questionNumber + 1);
    }
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
            <QuestionCounter>{questionNumber}</QuestionCounter>
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

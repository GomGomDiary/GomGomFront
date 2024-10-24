import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants, SwingAnimation } from '@/design';
import { answererAtom } from '@/store/answer';
import { questionerAtom } from '@/store/question';

export const WriteAnswererName = () => {
  const [isExiting, setIsExiting] = useState(false);
  const questioner = useAtomValue(questionerAtom);
  const navigate = useNavigate();
  const { diaryId } = useParams();

  useEffect(() => {
    if (!questioner) {
      navigate(`/diary/${diaryId}`);
    }
  });

  const [answerer, setAnswerer] = useAtom(answererAtom);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [isNameWritten, setIsNameWritten] = useState(false);

  const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerer(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitName();
    }
  };

  const handleSubmitName = () => {
    if (answerer) {
      setAnswerer(answerer);
      setIsExiting(true);
      setTimeout(() => {
        navigate(`/answer/${diaryId}`);
      }, 1000);
    } else {
      setIsNameWritten(true);
      nameInputRef.current?.focus();
    }
  };

  const handleModalClose = () => {
    nameInputRef.current?.focus();
  };

  const handlePrevious = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <WriteAnswererNameContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Title>
            <Emoji>🔒</Emoji>
            <Description>
              {questioner}님에게 <p></p>당신의 이름을 알려주세요.
            </Description>
          </Title>

          <InputWrapper>
            <Input
              value={answerer}
              onChange={e => handleWriteName(e)}
              onKeyUp={handleKeyPress}
              placeholder="10자 이내로 이름을 입력하세요."
              ref={nameInputRef}
              maxLength={10}
            />
          </InputWrapper>
          <Buttons>
            <Button
              text={'이전으로'}
              onClick={handlePrevious}
              variant="default"
            />
            <Button text={'시작'} onClick={handleSubmitName} variant="white" />
            {isNameWritten && (
              <Modal
                message={'이름을 입력해주세요.'}
                updateModal={handleModalClose}
              />
            )}
          </Buttons>
        </WriteAnswererNameContainer>
      )}
    </AnimatePresence>
  );
};

const WriteAnswererNameContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  text-align: center;
`;

const Title = styled.div`
  line-height: 1.6;
`;

const Emoji = styled.div`
  font-size: 40px;
  animation: ${SwingAnimation} 0.8s infinite;
`;

const Description = styled.div`
  font-size: 25px;
`;

const InputWrapper = styled.div`
  padding: 30px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;

import { useState, ChangeEvent } from 'react';

import { questionerAtom } from '@/store/create/questioner';
import { questionArrAtom } from '@/store/create/questionArr';
import { challengeAtom } from '@/store/create/challenge';
import { countersignAtom } from '@/store/create/countersign';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, Modal, Input } from '@/components';
import instance from '@/utils/customAxios';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const WriteCountersign = () => {
  const navigate = useNavigate();
  const [countersign, setCountersign] = useAtom(countersignAtom);
  const [isCountersignWritten, setIsCountersignWritten] = useState(false);

  const questioner = useAtomValue(questionerAtom);
  const questionArr = useAtomValue(questionArrAtom);
  const challenge = useAtomValue(challengeAtom);

  const [isRewrite, setIsRewrite] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleWriteCountersign = (e: ChangeEvent<HTMLInputElement>) => {
    setCountersign(e.target.value);
  };

  const handleModalClose = () => {
    setIsCountersignWritten(false);
    setIsRewrite(false);
  };

  const handlePrevious = () => {
    setIsExiting(true);
    setCountersign('');
    setTimeout(() => {
      navigate('/challenge');
    }, 1000);
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

  const handleSubmitCountersign = async () => {
    if (countersign) {
      setCountersign(countersign);
      const axiosInstance = instance();

      const { status: statusCode } = await axiosInstance.post(
        'diary/question',
        {
          question: questionArr,
          questioner,
          challenge,
          countersign,
        }
      );

      if (statusCode === 201) {
        navigate('/finish');
      }

      const { data: isDiaryCreated } = await axiosInstance.get('diary/');

      if (isDiaryCreated) {
        setIsRewrite(true);
      }
    } else {
      setIsCountersignWritten(true);
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <WriteCountersignContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          key="WriteCountersign"
        >
          {isCountersignWritten && (
            <Modal
              message={'암호의 답을 입력해주세요.'}
              updateModal={handleModalClose}
            />
          )}
          <Title>
            <Emoji>🔑</Emoji>
            <Subtitle>거의 다 왔다곰!</Subtitle>
            <Description>
              우리만의 암호를 아는 사람만 답장할 수 있도록
              <br />
              암호의 답을 정확하게 입력해주세요.
              <br />
              (ex. 0718, INFJ 등)
            </Description>
          </Title>
          <CountersignContent>
            <Countersign>
              <Input
                value={countersign}
                onChange={e => handleWriteCountersign(e)}
                placeholder="50자 내외로 입력해주세요."
                maxLength={50}
              />
              <CountersignLength>{countersign.length}/50</CountersignLength>
            </Countersign>
          </CountersignContent>
          <Buttons>
            <Button
              text={'이전으로'}
              variant="white"
              onClick={handlePrevious}
            />
            <Button
              text={'다음'}
              variant="default"
              onClick={handleSubmitCountersign}
            />
          </Buttons>
          {isRewrite && (
            <Modal
              message={'이전 다이어리는 저장됐어요.'}
              updateModal={handleModalClose}
            />
          )}
        </WriteCountersignContainer>
      )}
    </AnimatePresence>
  );
};

export default WriteCountersign;

const SwingAnimation = keyframes`
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-10deg);
  }
`;

const WriteCountersignContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Title = styled.div`
  text-align: center;
  line-height: 1.6;
`;

const Emoji = styled.div`
  font-size: 40px;
  animation: ${SwingAnimation} 0.8s infinite;
`;

const Subtitle = styled.div`
  font-size: 25px;
  color: var(--point-color);
`;

const Description = styled.div``;

const CountersignContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Countersign = styled.div`
  width: 80%;
  text-align: center;
`;

const CountersignLength = styled.div`
  font-size: 12px;
  padding-top: 10px;
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;

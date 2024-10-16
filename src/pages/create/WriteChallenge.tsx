import { ChangeEvent, useEffect, useState } from 'react';
import { challengeAtom } from '@/store/create/challenge';
import { Button, Modal, Input } from '@/components';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { questionerAtom } from '@/store/create/questioner';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const WriteChallenge = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const [challenge, setChallenge] = useAtom(challengeAtom);
  const [isChallengeWritten, setIsChallengeWritten] = useState(false);

  const handleWriteChallenge = (e: ChangeEvent<HTMLInputElement>) => {
    setChallenge(e.target.value);
  };

  const handleSubmitChallenge = () => {
    if (challenge) {
      setIsExiting(true);
      setTimeout(() => {
        navigate('/countersign');
      }, 1000);
    } else {
      setIsChallengeWritten(true);
    }
  };

  const handleModalClose = () => {
    setIsChallengeWritten(false);
  };

  const [isExiting, setIsExiting] = useState(false);

  const handlePrevious = () => {
    setIsExiting(true);
    setChallenge('');
    setTimeout(() => {
      navigate('/question-list');
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

  return (
    <AnimatePresence>
      {!isExiting && (
        <WriteChallengeContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          key="WriteChallenge"
        >
          {isChallengeWritten && (
            <Modal
              message={'암호를 설정해주세요.'}
              updateModal={handleModalClose}
            />
          )}
          <Title>
            <Emoji>🔒</Emoji>
            <Subtitle>모든 질문이 완성됐다곰!</Subtitle>
            <Description>
              우리만의 암호를 아는 사람만 답장할 수 있도록
              <br />
              암호는 정확하고 명확한 것으로 입력해주세요.
              <br />
              (ex. 내 생일 4자리, 내 MBTI 대문자 등)
            </Description>
          </Title>
          <ChallengeContent>
            <Challenge>
              <Input
                value={challenge}
                onChange={e => handleWriteChallenge(e)}
                placeholder="50자 내외로 입력해주세요."
                maxLength={50}
              />
              <ChallengeLength>{challenge.length}/50</ChallengeLength>
            </Challenge>
          </ChallengeContent>
          <Buttons>
            <Button
              text={'이전으로'}
              variant="white"
              onClick={handlePrevious}
            />
            <Button
              text={'다음'}
              variant="default"
              onClick={handleSubmitChallenge}
            />
          </Buttons>
        </WriteChallengeContainer>
      )}
    </AnimatePresence>
  );
};

export default WriteChallenge;

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

const WriteChallengeContainer = styled(motion.div)`
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

const ChallengeContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Challenge = styled.div``;

const ChallengeLength = styled.div`
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

import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input } from '@/components';
import { useAtom } from 'jotai';
import { questionerAtom } from '@/store/create/questioner';
import { ChangeEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const Welcome = () => {
  const navigate = useNavigate();
  const [questioner, setQuestioner] = useAtom(questionerAtom);
  const [isExiting, setIsExiting] = useState(false);

  const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestioner(e.target.value);
  };

  const [isNameWritten, setIsNameWritten] = useState(false);

  const handleModalClose = () => {
    setIsNameWritten(false);
  };

  const handleSubmitName = () => {
    if (questioner) {
      setQuestioner(questioner);
      setIsExiting(true);
      setTimeout(() => {
        navigate('/question-number');
      }, 1000);
    } else {
      setIsNameWritten(true);
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

  return (
    <AnimatePresence>
      {isNameWritten && (
        <Modal message="이름을 입력해주세요." updateModal={handleModalClose} />
      )}
      {!isExiting && (
        <WelcomeContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          key="Welcome"
        >
          <Title>
            <Emoji>🐻💭</Emoji>
            <Subtitle>
              상대에 대해 곰곰이 생각하고
              <br />
              답하는 곰곰 다이어리
            </Subtitle>
          </Title>
          <Description>
            <Introduction>반갑다곰!</Introduction>
            <Subtitle>
              질문을 만들고 특별한 암호를 설정한 뒤<br />
              소중한 친구, 가족, 연인과 공유해서
              <br />
              많은 답변과 추억을 쌓아보라곰!
            </Subtitle>
          </Description>
          <NameInput>
            <Input
              value={questioner}
              onChange={handleWriteName}
              placeholder="10자 이내로 이름을 입력하세요."
              maxLength={10}
            />
            <Button
              text={'시작'}
              variant="default"
              onClick={handleSubmitName}
            />
          </NameInput>
        </WelcomeContainer>
      )}
    </AnimatePresence>
  );
};

export default Welcome;

const SwingAnimation = keyframes`
  0% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(-5deg);
  }
`;

const WelcomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 50px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 1.2;
`;

const Emoji = styled.div`
  animation: ${SwingAnimation} 1s infinite;
  font-size: 40px;
`;

const Subtitle = styled.div``;

const Description = styled.section`
  line-height: 1.6;
`;

const Introduction = styled.div`
  font-size: 18px;
  line-height: 1.4;
  color: var(--point-color);
  padding: 10px 0px;
  font-weight: bold;
`;

const NameInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
`;

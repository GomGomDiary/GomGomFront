import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import { TitleSection } from '@/design/TitleSection';
import { challengeAtom, questionerAtom } from '@/store/create';

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
          <TitleSection
            emoji="🔒"
            subtitle="모든 질문이 완성됐다곰!"
            description={
              <>
                우리만의 암호를 아는 사람만 답장할 수 있도록
                <br />
                암호는 정확하고 명확한 것으로 입력해주세요.
                <br />
                (ex. 내 생일 4자리, 내 MBTI 대문자 등)
              </>
            }
          />
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

const WriteChallengeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

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

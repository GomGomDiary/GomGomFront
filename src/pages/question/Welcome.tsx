import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import { questionerAtom, rewriteDiaryAtom } from '@/store/question';
import { getCookie, instance, setCookie } from '@/utils';

export const Welcome = () => {
  const navigate = useNavigate();
  const [questioner, setQuestioner] = useAtom(questionerAtom);
  const [isExiting, setIsExiting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const axiosInstance = instance();
  const [rewriteDiary, setRewriteDiary] = useAtom(rewriteDiaryAtom);

  const diaryId = getCookie('diaryAddress');
  const diaryUser = getCookie('diaryUser');
  const localDiaryId = localStorage.getItem('diaryAddress');
  const localDiaryUser = localStorage.getItem('diaryUser');

  useEffect(() => {
    if (diaryId || diaryUser) {
      localStorage.setItem('diaryAddress', diaryId);
      localStorage.setItem('diaryUser', diaryUser);
    } else if (localDiaryId || localDiaryUser) {
      setCookie({ name: 'diaryAddress', value: localDiaryId, options: {} });
      setCookie({ name: 'diaryUser', value: localDiaryUser, options: {} });
    }
  }, [diaryId, diaryUser, localDiaryId, localDiaryUser]);

  const handleWriteName = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestioner(e.target.value);
  };

  const [isNameWritten, setIsNameWritten] = useState(false);

  const handleModalClose = () => {
    setIsNameWritten(false);
    nameInputRef.current?.focus();
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

  useEffect(() => {
    const checkDiary = async () => {
      try {
        const response = await axiosInstance.get('/diary');
        if (response.data === true && !rewriteDiary) {
          const redirectDiaryId = diaryId || localDiaryId;
          localStorage.setItem('diaryAddress', redirectDiaryId);
          navigate(`/answerers/${redirectDiaryId}`);
        }
      } catch (error) {
        console.error('다이어리 확인 중 오류 발생:', error);
      }
      setRewriteDiary(false);
    };
    checkDiary();
  }, []);

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
              ref={nameInputRef}
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

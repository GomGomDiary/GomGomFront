import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants, SwingAnimation } from '@/design';
import { useFetchDiaryInfo } from '@/hook/question/MatchChallenge';
import { useDiaryAnswerStatus } from '@/hook/question/MatchChallenge/useDiaryAnswerStatus';
import { answererTokenAtom } from '@/store/answer';
import {
  challengeAtom,
  questionerAtom,
  questionerCookieAtom,
} from '@/store/question';
import { EventTrigger, getCookie } from '@/utils';
import { instance } from '@/utils';

export const MatchChallenge = () => {
  const [isExiting, setIsExiting] = useState(false);

  const setQuestionerCookie = useSetAtom(questionerCookieAtom);
  const [questioner, setQuestioner] = useAtom(questionerAtom);
  const [challenge, setChallenge] = useAtom(challengeAtom);
  const setAnswererToken = useSetAtom(answererTokenAtom);

  const [countersign, setCountersign] = useState('');

  const [isDiaryNotFound, setIsDiaryNotFound] = useState(false);
  const [isAlreadyAnswered, setIsAlreadyAnswered] = useState(false);
  const [isDiaryOwner, setIsDiaryOwner] = useState(false);

  const { diaryId } = useParams();
  const navigate = useNavigate();
  const axiosInstance = instance();

  const answerId = getCookie('diaryAddress');
  const [isCountersignCorrected, setIsCountersignCorrected] = useState('');
  const countersignInputRef = useRef<HTMLInputElement>(null);

  const {
    data: answerStatus,
    isLoading: isAnswerLoading,
    isError: isAnswerError,
  } = useDiaryAnswerStatus(diaryId, axiosInstance);

  const {
    data: challengeData,
    isLoading: isChallengeLoading,
    isError: isChallengeError,
  } = useFetchDiaryInfo(diaryId, axiosInstance);

  useEffect(() => {
    if (answerStatus) {
      setIsAlreadyAnswered(answerStatus);
    }
  }, [answerStatus]);

  useEffect(() => {
    setIsDiaryOwner(diaryId === answerId);
  }, []);

  useEffect(() => {
    if (challengeData) {
      setQuestionerCookie(challengeData._id);
      setChallenge(challengeData.challenge);
      setQuestioner(challengeData.questioner);
    }
  }, [
    challengeData,
    diaryId,
    setChallenge,
    setQuestioner,
    setQuestionerCookie,
  ]);

  const handleBeforeNavigate = () => {
    setIsDiaryNotFound(false);
    setIsExiting(true);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  const handleDisplayAnswer = () => {
    setIsDiaryOwner(false);
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/answerers/${diaryId}`);
    }, 1000);
  };

  if (isAnswerLoading || isChallengeLoading) return <p>로딩중...</p>;
  if (isAnswerError || isChallengeError) {
    setIsDiaryNotFound(true);
  }

  const handleModalClose = () => {
    setIsCountersignCorrected('');
    countersignInputRef.current?.focus();
  };

  const handleWriteCountersign = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountersign(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitCountersign();
    }
  };

  const handleSubmitCountersign = async () => {
    if (!countersign) {
      setIsCountersignCorrected('none');
      return;
    }
    try {
      const response = await axiosInstance.post(
        `diary/countersign/${diaryId}`,
        { countersign }
      );
      setAnswererToken(response.data.diaryToken);
      EventTrigger({
        action: '답장 시작하기',
        category: 'countersign',
        label: '답장 시작하기',
        value: 1,
      });
      setIsExiting(true);
      setTimeout(() => {
        navigate(`/answerer-name/${diaryId}`);
      }, 1000);
    } catch (error) {
      setIsCountersignCorrected('incorrect');
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <MatchChallengeContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Title>
            <Emoji>🔒</Emoji>
            <Description>
              {questioner}님의 질문지를 <p></p>보려면 암호를 맞춰야 한다곰!
            </Description>
          </Title>
          <ChallengeWrapper>{challenge}</ChallengeWrapper>
          <InputWrapper>
            <Input
              value={countersign}
              onChange={e => handleWriteCountersign(e)}
              placeholder="암호를 입력하세요."
              onKeyUp={handleKeyPress}
              ref={countersignInputRef}
            />
            <Button
              text={'다음'}
              onClick={handleSubmitCountersign}
              variant="default"
            />
            {isCountersignCorrected === 'incorrect' && (
              <Modal
                message={'틀렸어요. 다시 입력해주세요.'}
                updateModal={handleModalClose}
              />
            )}
            {isCountersignCorrected === 'none' && (
              <Modal
                message={'암호를 입력해주세요.'}
                updateModal={handleModalClose}
              />
            )}
            {isDiaryNotFound && (
              <Modal
                message={'존재하지 않는 다이어리예요.'}
                updateModal={handleBeforeNavigate}
              />
            )}
            {isAlreadyAnswered && (
              <Modal
                message={'이미 답장한 다이어리예요.'}
                updateModal={handleDisplayAnswer}
              />
            )}
            {isDiaryOwner && (
              <Modal
                message={'자신의 다이어리엔 답할 수 없어요.'}
                updateModal={handleBeforeNavigate}
              />
            )}
          </InputWrapper>
        </MatchChallengeContainer>
      )}
      ;
    </AnimatePresence>
  );
};

const MatchChallengeContainer = styled(motion.div)`
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

const ChallengeWrapper = styled.div`
  background-color: var(--main-color);
  padding: 30px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
`;

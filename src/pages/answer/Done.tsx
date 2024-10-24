import { AxiosError } from 'axios';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Modal } from '@/components';
import { ConfettiEffect } from '@/design';
import { TitleSection } from '@/design/TitleSection';
import { answerArrAtom, answererAtom, answererTokenAtom } from '@/store/answer';
import {
  challengeAtom,
  countersignAtom,
  originQuestionArrAtom,
  originQuestionNumberAtom,
  questionArrAtom,
  questionerAtom,
  questionNumberAtom,
} from '@/store/question';
import { EventTrigger, instance } from '@/utils';

export const Done = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [questioner, setQuestioner] = useAtom(questionerAtom);
  const setQuestionerArr = useSetAtom(questionArrAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const setQuestionNumber = useSetAtom(questionNumberAtom);
  const setCountersign = useSetAtom(countersignAtom);
  const originQuestionArr = useAtomValue(originQuestionArrAtom);
  const originQuestionNumber = useAtomValue(originQuestionNumberAtom);

  const answerArr = useAtomValue(answerArrAtom);
  const answerer = useAtomValue(answererAtom);
  const answererToken = useAtomValue(answererTokenAtom);

  const [isAlreadyAnswered, setIsAlreadyAnswered] = useState(false);

  useEffect(() => {
    const fetchUserCookie = async () => {
      try {
        const axiosInstance = instance(answererToken);
        await axiosInstance.post(
          `diary/answer/${diaryId}`,
          {
            answerer: answerer,
            answers: answerArr,
          },
          { withCredentials: true }
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 409) {
            setIsAlreadyAnswered(true);
          }
        }
      }
    };
    fetchUserCookie();
  }, []);

  useEffect(() => {
    if (!questioner) {
      navigate(`/answerers/${diaryId}`);
    }
  }, []);

  const handleDisplayAnswererList = () => {
    navigate(`/answerers/${diaryId}`);
  };

  const handleMakeGomgom = () => {
    navigate('/');

    setQuestioner('');
    setQuestionerArr(originQuestionArr);
    setChallenge('');
    setCountersign('');
    setQuestionNumber(originQuestionNumber);

    EventTrigger({
      action: '나도 만들기',
      category: 'make',
      label: '나도 만들기',
      value: 1,
    });
  };

  return (
    <div>
      <ConfettiEffect />
      <DoneContainer>
        <TitleSection
          emoji="🎉"
          subtitle="곰곰다이어리가 완성됐어요!"
          description={`${questioner}님에게 알려보세요!`}
        />
        <Buttons>
          <Button
            variant="white"
            text="내 답장 확인하기"
            onClick={handleDisplayAnswererList}
          />
          <Button
            variant="default"
            text="나도 만들기"
            onClick={handleMakeGomgom}
          />
        </Buttons>
      </DoneContainer>
      {isAlreadyAnswered && (
        <Modal
          message={'이미 답장한 다이어리예요.'}
          updateModal={handleDisplayAnswererList}
        />
      )}
    </div>
  );
};

const DoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 50vh;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

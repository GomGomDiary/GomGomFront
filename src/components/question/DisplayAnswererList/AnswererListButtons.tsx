import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/button/Button';
import { ChoiceModal } from '@/components/modal/ChoiceModal';
import { Modal } from '@/components/modal/Modal';
import {
  challengeAtom,
  countersignAtom,
  originQuestionArrAtom,
  originQuestionNumberAtom,
  questionArrAtom,
  questionerAtom,
  questionNumberAtom,
} from '@/store/question';
import {
  EventTrigger,
  initializeKakao,
  instance,
  sendKakaoLink,
  shareLink,
} from '@/utils';

type ButtonsProps = {
  isDiaryOwner: boolean;
};

export const AnswererListButtons = ({ isDiaryOwner }: ButtonsProps) => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [isRewriteDiary, setIsRewriteDiary] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const setQuestioner = useSetAtom(questionerAtom);
  const setQuestionArr = useSetAtom(questionArrAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const setCountersign = useSetAtom(countersignAtom);
  const setQuestionNumber = useSetAtom(questionNumberAtom);
  const originQuestionArr = useAtomValue(originQuestionArrAtom);
  const originQuestionNumber = useAtomValue(originQuestionNumberAtom);

  const handleModalClose = () => {
    setIsCopied(false);
    setIsRewriteDiary(false);
  };

  const handleGoToMain = () => {
    navigate('/');
  };

  const handleMakeNewDiary = async () => {
    const axiosInstance = instance();

    const { data: diaryData } = await axiosInstance.get('diary/');

    if (diaryData) {
      setIsRewriteDiary(true);
      EventTrigger({
        action: '다이어리 새로 만들기',
        category: 'remake',
        label: '다이어리 새로 만들기',
        value: 1,
      });
    } else {
      setQuestioner('');
      setQuestionArr(originQuestionArr);
      setChallenge('');
      setCountersign('');
      setQuestionNumber(originQuestionNumber);
      navigate('/');
      EventTrigger({
        action: '나도 만들기',
        category: 'make',
        label: '나도 만들기',
        value: 1,
      });
    }
  };

  const location = window.location.origin;

  const handleShareLink = () => {
    const link = `${location}/diary/${diaryId}`;
    shareLink(link, () => setIsCopied(true));
  };

  const handleKakaoTalk = async () => {
    initializeKakao();

    const description = '상대에 대해 곰곰이 생각하고 답해보세요!';
    const imageUrl = `${location}/image/OG_Thumb.png`;
    const buttonTitle = '답장하기';
    const link = `${location}/diary/${diaryId}`;

    sendKakaoLink(description, imageUrl, link, buttonTitle);
  };

  return (
    <ButtonContainer>
      {isDiaryOwner ? (
        <>
          <Button
            variant="white"
            text="링크로 공유하기"
            onClick={handleShareLink}
          />
          <Button
            variant="white"
            text="카톡으로 공유하기"
            onClick={handleKakaoTalk}
          />
          <Button
            variant="default"
            text="새로 만들기"
            onClick={handleMakeNewDiary}
          />
        </>
      ) : (
        <>
          <Button
            variant="white"
            text="나도 만들기"
            onClick={handleMakeNewDiary}
          />
          <Button
            variant="default"
            text="내 다이어리 확인하기"
            onClick={handleGoToMain}
          />
        </>
      )}
      {isCopied && (
        <Modal message={'링크를 복사했어요.'} updateModal={handleModalClose} />
      )}
      {isRewriteDiary && (
        <ChoiceModal
          message={`이전 다이어리는 저장되어 조회만 가능합니다.
            왼쪽 시계 버튼을 누르면 조회할 수 있습니다.

            다이어리를 새로 만들까요?
            `}
          updateModal={handleModalClose}
        />
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

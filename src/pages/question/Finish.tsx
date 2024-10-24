import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Modal } from '@/components';
import { ConfettiEffect } from '@/design';
import { TitleSection } from '@/design/TitleSection';
import { questionerCookieAtom } from '@/store/question';
import { shareLink } from '@/utils';
import { getCookie } from '@/utils/cookie';
import { initializeKakao, sendKakaoLink } from '@/utils/kakao';

export const Finish = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [questionerCookie, setQuestionerCookie] = useAtom(questionerCookieAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionerCookieAtom = async () => {
      try {
        const diaryId = await getCookie('diaryAddress');
        setQuestionerCookie(diaryId);

        const diaryUser = getCookie('diaryUser');
        localStorage.setItem('diaryAddress', diaryId);
        localStorage.setItem('diaryUser', diaryUser);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchQuestionerCookieAtom();
  }, [setQuestionerCookie]);

  const [isCopied, setIsCopied] = useState(false);

  const handleModalClose = () => {
    setIsCopied(false);
  };

  const handleShareLink = () => {
    const location = window.location.origin;
    const link = `${location}/diary/${questionerCookie}`;
    shareLink(link, () => setIsCopied(true));
  };

  const handleKakaoTalk = async () => {
    initializeKakao();

    const description = '상대에 대해 곰곰이 생각하고 답해보세요!';
    const imageUrl = `${location}image/OG_Thumb.png`;
    const buttonTitle = '답장하기';
    const link = `${location}diary/${questionerCookie}`;

    sendKakaoLink(description, imageUrl, link, buttonTitle);
  };

  const handleGoToAnswerList = () => {
    navigate(`/answerers/${questionerCookie}`);
  };

  return (
    <>
      <ConfettiEffect />
      <FinishContainer>
        <TitleSection
          emoji="🎉"
          subtitle="곰곰다이어리가 완성됐다곰!"
          description={
            <>
              완성된 다이어리를 공유해보세요.
              <br />
              반드시 아래 버튼으로 링크를 공유해주세요!
              <br />
            </>
          }
        />
        <Buttons>
          <Button
            text={'링크로 공유하기'}
            variant="white"
            onClick={handleShareLink}
          />

          <Button
            text={'카톡으로 공유하기'}
            variant="white"
            onClick={handleKakaoTalk}
          />
          <Button
            text={'답변 현황 확인하기'}
            variant="default"
            onClick={handleGoToAnswerList}
          />
          {isCopied && (
            <Modal
              message={'링크를 복사했어요.'}
              updateModal={handleModalClose}
            />
          )}
        </Buttons>
      </FinishContainer>
    </>
  );
};

const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;

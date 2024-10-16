import { useEffect, useState } from 'react';

import ConfettiEffect from '@/design/ConfettiEffect';
import { Button, Modal } from '@/components';

import { userCookieAtom } from '@/store/create/userCookie';
import { getCookie } from '@/utils/cookie';

import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { EventTrigger } from '@/utils/gtag';
import styled, { keyframes } from 'styled-components';
import { initializeKakao, sendKakaoLink } from '@/utils/kakao';

const Finish = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [userCookie, setUserCookie] = useAtom(userCookieAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCookie = async () => {
      try {
        const diaryId = await getCookie('diaryAddress');
        setUserCookie(diaryId);

        const diaryUser = getCookie('diaryUser');
        localStorage.setItem('diaryAddress', diaryId);
        localStorage.setItem('diaryUser', diaryUser);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchUserCookie();
  }, [setUserCookie]);

  const [isCopied, setIsCopied] = useState(false);

  const handleShareLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        EventTrigger({
          action: '링크 공유하기',
          category: 'share',
          label: '링크 공유하기',
          value: 1,
        });
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  const handleModalClose = () => {
    setIsCopied(false);
  };

  const location = window.location.href;

  const handleKakaoTalk = async () => {
    initializeKakao();

    const description = '상대에 대해 곰곰이 생각하고 답해보세요!';
    const imageUrl = `${location}image/OG_Thumb.png`;
    const buttonTitle = '답장하기';
    const link = `${location}diary/${userCookie}`;

    sendKakaoLink(description, imageUrl, link, buttonTitle);
  };

  const handleGoToAnswerList = () => {
    navigate(`/answerers/${userCookie}`);
  };

  return (
    <>
      <ConfettiEffect />
      <FinishContainer>
        <Title>
          <Emoji>🎉</Emoji>
          <Subtitle>곰곰다이어리가 완성됐다곰!</Subtitle>
          <Description>
            완성된 다이어리를 공유해보세요.
            <br />
            반드시 아래 버튼으로 링크를 공유해주세요!
            <br />
          </Description>
        </Title>
        <Buttons>
          <Button
            text={'링크로 공유하기'}
            variant="white"
            onClick={() => {
              handleShareLink(`${location}diary/${userCookie}`);
            }}
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

export default Finish;

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

const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;

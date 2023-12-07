import React, { useEffect } from 'react';
import instance from '../../api/customAxios';
import Styles from './Done.module.css';
import ConfettiEffect from '../../components/ConfettiEffect';

import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';

import { UserCookie } from '../../store/Create/UserCookie';
import { Answerer } from '../../store/Response/Answerer';
import { Response } from '../../store/Response/Response';
import { Questioner } from '../../store/Create/Questioner';
import { useRecoilValue } from 'recoil';
import { AnswererToken } from '../../store/Response/AnswererToken';
import { useNavigate } from 'react-router-dom';

const Done = ({ goToFirstStep }) => {
  const answererJWT = useRecoilValue(AnswererToken);
  const answerer = useRecoilValue(Answerer);
  const response = useRecoilValue(Response);

  const diaryId = useRecoilValue(UserCookie);

  useEffect(() => {
    const fetchUserCookie = async () => {
      try {
        const axiosInstance = instance(answererJWT);
        await axiosInstance.post(
          `/answer/${diaryId}`,
          {
            answerer: answerer,
            answers: response,
          },
          { withCredentials: true }
        );
      } catch (error) {
        alert('잘못된 접근이에요.');
      }
    };
    fetchUserCookie();
  }, []);

  const navigate = useNavigate('');

  const handleDisplayAnswerList = () => {
    navigate(`/answerers/${diaryId}`);
  };

  const handleMakeGomgom = () => {
    navigate('/');
    goToFirstStep();
  };

  return (
    <div>
      <ConfettiEffect />
      <div className={Styles.Done}>
        <div className={Styles.top}>
          <div>🎉</div>
          <div>곰곰다이어리가 완성됐어요!</div>
          <div>{useRecoilValue(Questioner)}님에게 알려보세요!</div>
        </div>
        <div className={Styles.middle}>
          <WhiteBtn text={'카톡으로 알리기'} />
          <WhiteBtn
            text={'내 답장 확인하기'}
            onClick={() => handleDisplayAnswerList()}
          />
        </div>
        <div className={Styles.bottom}>
          <Btn text={'나도 만들어보기'} onClick={() => handleMakeGomgom()} />
        </div>
      </div>
    </div>
  );
};

export default Done;

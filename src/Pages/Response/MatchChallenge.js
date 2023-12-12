import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/customAxios';
import Styles from './MatchChallenge.module.css';

import Input from '../../components/Input';
import Btn from '../../components/Btn';
import CustomModal from '../../components/CustomModal';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { UserCookie } from '../../store/Create/UserCookie';
import { Challenge } from '../../store/Create/Challenge';
import { Questioner } from '../../store/Create/Questioner';
import { AnswererToken } from '../../store/Response/AnswererToken';
import { getCookie } from '../../api/cookie';
import { EventTrigger } from '../../gtag';

const MatchChallenge = ({ onNextStep }) => {
  const [userCookie, setUserCookie] = useRecoilState(UserCookie);
  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [answererToken, setAnswererToken] = useRecoilState(AnswererToken);

  const { diaryId } = useParams();

  const navigate = useNavigate('');
  const [countersign, setCountersign] = useState('');
  const axiosInstance = instance(answererToken);

  const [isExisted, setIsExisted] = useState(false);

  const handleBeforeNavigate = () => {
    setIsExisted(false);
    navigate('/');
  };

  const handleDisplayAnswer = () => {
    setIsMyself(false);
    navigate(`/answerers/${diaryId}`);
  };

  const [isAlreadyAnswered, setIsAlreadyAnswered] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/diary/${diaryId}`).then((response) => {
      if (response.data === true) {
        setIsAlreadyAnswered(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!!diaryId) {
      setUserCookie(diaryId);

      axiosInstance
        .get(`diary/challenge/${diaryId}`)
        .then((response) => {
          if (response.status === 200) {
            setChallenge(response.data.challenge);
            setQuestioner(response.data.questioner);
          }
        })
        .catch((error) => {
          setIsExisted(true);
        });
    }
  }, []);

  const CountersignInput = useRef();

  const writeCountersign = (e) => {
    setCountersign(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitCountersign();
    }
  };

  const [isCorrected, setIsCorrected] = useState('');

  const handleModalClose = () => {
    setIsCorrected('');
  };

  const [isMyself, setIsMyself] = useState(false);

  const answerId = getCookie('diaryAddress');

  useEffect(() => {
    if (diaryId === answerId) {
      setIsMyself(true);
    }
  }, []);

  /* 코드 중복 고민 필요 */

  const submitCountersign = () => {
    if (countersign) {
      axiosInstance
        .post(`diary/countersign/${diaryId}`, { countersign })
        .then((response) => {
          setAnswererToken(response.data.diaryToken);
          onNextStep();
          EventTrigger({
            action: 'click',
            category: 'countersign',
            label: '답장 시작하기',
            value: 1,
          });
        })
        .catch(() => {
          setIsCorrected('오답');
          CountersignInput.current.focus();
        });
    } else {
      setIsCorrected('미입력');
      CountersignInput.current.focus();
    }
  };

  return (
    <div className={Styles.MatchChallengeContainer}>
      <div className={Styles.top}>
        <div>🔒</div>
        <div>
          {useRecoilValue(Questioner)}님의 질문지를 <p></p>보려면 암호를 맞춰야
          한다곰!
        </div>
      </div>
      <div className={Styles.middle}>{useRecoilValue(Challenge)}</div>
      <div className={Styles.bottom}>
        <Input
          type="text"
          value={countersign}
          onChange={(e) => writeCountersign(e)}
          placeholder="암호를 입력하세요."
          onKeyUp={handleKeyPress}
          ref={CountersignInput}
        />
        <Btn text={'다음'} onClick={submitCountersign} />
        {isCorrected === '오답' && (
          <CustomModal
            message={'틀렸어요. 다시 입력해주세요.'}
            updateModal={handleModalClose}
          />
        )}
        {isCorrected === '미입력' && (
          <CustomModal
            message={'암호를 입력해주세요.'}
            updateModal={handleModalClose}
          />
        )}
        {isExisted && (
          <CustomModal
            message={'존재하지 않는 다이어리예요.'}
            updateModal={handleBeforeNavigate}
          />
        )}
        {isAlreadyAnswered && (
          <CustomModal
            message={'이미 답장한 다이어리예요.'}
            updateModal={handleDisplayAnswer}
          />
        )}
        {isMyself && (
          <CustomModal
            message={'자신의 다이어리엔 답할 수 없어요.'}
            updateModal={handleBeforeNavigate}
          />
        )}
      </div>
    </div>
  );
};

export default MatchChallenge;

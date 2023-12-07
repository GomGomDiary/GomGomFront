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

  useEffect(() => {
    if (!!diaryId) {
      setUserCookie(diaryId);

      axiosInstance
        .get(`/challenge/${diaryId}`)
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
  }, [diaryId, setUserCookie, setChallenge, setQuestioner, navigate]);

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

  /* 코드 중복 고민 필요 */

  const submitCountersign = () => {
    if (countersign) {
      axiosInstance
        .post(`/countersign/${diaryId}`, { countersign })
        .then((response) => {
          setAnswererToken(response.data.diaryToken);
          onNextStep();
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
          {useRecoilValue(Questioner)}님의 질문지를 보려면 <p></p>암호를 맞춰야
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
      </div>
    </div>
  );
};

export default MatchChallenge;

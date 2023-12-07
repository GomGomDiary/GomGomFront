import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Styles from './WriteResponse.module.css';
import instance from '../../api/customAxios';

import WhiteBtn from '../../components/WhiteBtn';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import CustomModal from '../../components/CustomModal';

import { UserCookie } from '../../store/Create/UserCookie';
import { AnswererToken } from '../../store/Response/AnswererToken';
import { Response } from '../../store/Response/Response';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../api/cookie';

const WriteResponse = ({ onNextStep, onPreviousStep }) => {
  const diaryId = useRecoilValue(UserCookie);
  const answererJWT = useRecoilValue(AnswererToken);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionArr, setQuestionArr] = useState([]);

  const api = instance(answererJWT);
  const navigate = useNavigate('');

  const [isWritten, setIsWritten] = useState(false);

  const handleModalClose = () => {
    setIsWritten(false);
  };

  useEffect(() => {
    api
      .get(`/question/${diaryId}`)
      .then((response) => {
        setQuestionArr(response.data.question);
        setQuestionNumber(response.data.questionLength);
      })
      .catch((error) => console.error(error));
  }, []);

  const [isMyself, setIsMyself] = useState(false);

  const answerId = getCookie('diaryAddress');

  const handleBeforeNavigate = () => {
    setIsMyself(false);
    navigate(`/answerers/${answerId}`);
  };

  useEffect(() => {
    if (diaryId === answerId) {
      setIsMyself(true);
    }
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const responseInputRef = useRef();
  const [response, setResponse] = useState('');
  const [responseArr, setResponseArr] = useRecoilState(Response);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionNumber - 1 && response) {
      setResponseArr([...responseArr, response]);
      setResponse('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!response) {
      setIsWritten(true);
      responseInputRef.current.focus();
    } else {
      onNextStep();
      setResponseArr([...responseArr, response]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const newArr = [...responseArr];
      newArr.splice(currentQuestionIndex - 1, 1);
      setResponseArr(newArr);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onPreviousStep();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questionNumber - 1) {
      let skip = '생략했어요.';
      setResponse('');
      setResponseArr([...responseArr, skip]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let skip = '생략했어요.';
      onNextStep();
      setResponseArr([...responseArr, skip]);
    }
  };

  const currentQuestion = questionArr[currentQuestionIndex];

  const calculateProgress = useMemo(() => {
    return ((currentQuestionIndex + 1) / questionArr.length) * 100;
  }, [currentQuestionIndex, questionArr.length]);

  return (
    <div className={Styles.WriteResponse}>
      <div className={Styles.QuestionList} key={currentQuestionIndex}>
        {currentQuestionIndex < questionNumber && (
          <>
            <div className={Styles.top}>
              <div className={Styles.title}></div>
              <div className={Styles.progressBar}>
                <div
                  className={Styles.progress}
                  style={{ width: `${calculateProgress}%` }}
                ></div>
              </div>
            </div>
            <div className={Styles.middle}>
              <div className={Styles.questionContent}>
                <p>✉️ {currentQuestionIndex + 1}번째 질문 ✉️</p>
                <span>{currentQuestion}</span>
                <Input
                  placeholder="100자 내외로 답장을 입력하세요."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  ref={responseInputRef}
                  maxLength={100}
                />
              </div>
              <div className={Styles.Btns}>
                <WhiteBtn text={'이전으로'} onClick={handlePrevious} />
                <Btn text={'다음 질문'} onClick={handleNextQuestion} />
                {isWritten && (
                  <CustomModal
                    message={'답장을 작성해주세요.'}
                    updateModal={handleModalClose}
                  />
                )}
              </div>
            </div>
            <div className={Styles.botton}>
              <button className={Styles.skipBtn} onClick={handleSkip}>
                스킵하기
              </button>
            </div>
            {isMyself && (
              <CustomModal
                message={'자신의 다이어리엔 답할 수 없어요.'}
                updateModal={handleBeforeNavigate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WriteResponse;

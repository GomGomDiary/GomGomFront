import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Styles from './WriteResponse.module.css';
import instance from '../../api/customAxios';

import WhiteBtn from '../../components/WhiteBtn';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import CustomModal from '../../components/CustomModal';

import { UserCookie } from '../../store/Create/UserCookie';
import { AnswererToken } from '../../store/response/AnswererToken';
import { Response } from '../../store/response/Response';

import { EventTrigger } from '../../gtag';

const WriteResponse = ({ onNextStep, onPreviousStep }) => {
  const diaryId = useRecoilValue(UserCookie);
  const answererJWT = useRecoilValue(AnswererToken);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionArr, setQuestionArr] = useState([]);

  const axiosInstance = instance(answererJWT);

  const [isWritten, setIsWritten] = useState(false);

  const handleModalClose = () => {
    setIsWritten(false);
  };

  useEffect(() => {
    axiosInstance
      .get(`diary/question/${diaryId}`)
      .then(response => {
        setQuestionArr(response.data.question);
        setQuestionNumber(response.data.questionLength);
      })
      .catch(error => console.error(error));
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
      EventTrigger({
        action: '답장 완료하기',
        category: 'success',
        label: '답장 완료하기',
        value: 1,
      });
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
                <span className={Styles.answer}>{currentQuestion}</span>
                <div className={Styles.responseAnswer}>
                  <Input
                    placeholder="100자 내외로 답장을 입력하세요."
                    value={response}
                    onChange={e => setResponse(e.target.value)}
                    ref={responseInputRef}
                    maxLength={100}
                  />
                  <div className={Styles.responseAnswerLength}>
                    {response.length}/100
                  </div>
                </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default WriteResponse;

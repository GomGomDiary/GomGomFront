import React, { useEffect, useState } from 'react';
import Styles from './DisplayAnswerList.module.css';
import instance from '../../api/customAxios';

import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Answer } from '../../store/Create/Answer';
import { Question } from '../../store/Create/Question';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import { getCookie } from '../../api/cookie';
import ResponseContent from '../../components/ResponseContent';
import CustomModal from '../../components/CustomModal';
import ConfirmModal from '../../components/ConfirmModal';
import { CounterSign } from '../../store/Create/CounterSign';
import { QuestionArr } from '../../store/Create/QuestionArr';
import { Challenge } from '../../store/Create/Challenge';
import { Questioner } from '../../store/Create/Questioner';
import { OriginQuestionArr } from '../../store/Create/OriginQuestionArr';
import { OriginQuestionNum } from '../../store/Create/OriginQuestionNum';
import { QuestionNum } from '../../store/Create/QuestionNum';
import { EventTrigger } from '../../gtag';

const DisplayAnswerList = ({ goToFirstStep }) => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  /* 다이어리 전역 상태 관리 */
  const [answererList, setAnswererList] = useState([]);
  const [answererCount, setAnswerCount] = useState(0);
  const [answer, setAnswer] = useRecoilState(Answer);
  const [question, setQuestion] = useRecoilState(Question);
  const [currentPage, setCurrentPage] = useState(1);

  /* 페이지네이션 */

  const [start, setStart] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(answererCount / itemsPerPage);

  const axiosInstance = instance();

  useEffect(() => {
    axiosInstance
      .get(`diary/answerers/${diaryId}/?start=${start}&take=${itemsPerPage}`)
      .then((response) => {
        if (response.status === 200) {
          setIsConnected(true);
          setAnswererList(response.data.answererList);
          setIsDiaryOwnerId(response.data._id);
          setAnswerCount(response.data.answerCount);
        }
      })
      .catch((e) => navigate('/error-route'));
  }, [currentPage, totalPages, start, diaryId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setStart((prevStart) => prevStart + itemsPerPage);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setStart((prevStart) => prevStart - itemsPerPage);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  /* 모달 관련 */
  const [isDiaryOwnerId, setIsDiaryOwnerId] = useState('');
  const [isAnswerer, setIsAnswerer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [wantNewDiary, setWantNewDiary] = useState(false);

  const handleDisplayResponse = (answerId) => {
    axiosInstance
      .get(`diary/answer/${diaryId}/${answerId}`)
      .then((response) => {
        setAnswer(response.data.answer);
        setQuestion(response.data.question);
        navigate(`/answer/${diaryId}/${answerId}`);
      })
      .catch((error) => setIsAnswerer(true));
  };

  let host = window.location.origin;
  let pathname = window.location.pathname.slice(11);

  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [questionArr, setQuestionArr] = useRecoilState(QuestionArr);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [countersign, setCountersign] = useRecoilState(CounterSign);
  const [questionNum, setQuestionNum] = useRecoilState(QuestionNum);
  const [originQuestionArr, setOriginQuestionArr] =
    useRecoilState(OriginQuestionArr);
  const [originQuestionNum, setOriginQuestionNum] =
    useRecoilState(OriginQuestionNum);

  const handleNewDiary = async () => {
    const axiosInstance = instance();

    const { data: diaryData } = await axiosInstance.get('diary/');

    if (diaryData) {
      setWantNewDiary(true);
      EventTrigger({
        action: 'click',
        category: 'remake',
        label: '다이어리 새로 만들기',
        value: 1,
      });
    } else {
      setQuestioner('');
      setQuestionArr(originQuestionArr);
      setChallenge('');
      setCountersign('');
      setQuestionNum(originQuestionNum);
      navigate('/');
      goToFirstStep();
      EventTrigger({
        action: 'click',
        category: 'make',
        label: '나도 만들기',
        value: 1,
      });
    }
  };

  const correctAnswerer = getCookie('diaryAddress');
  const [isDiaryOwner, setIsDiaryOwner] = useState(false);

  useEffect(() => {
    if (correctAnswerer === diaryId) {
      setIsDiaryOwner(true);
    }
  }, []);

  const [isCopied, setIsCopied] = useState(false);

  const handleModalClose = () => {
    setIsCopied(false);
    setIsAnswerer(false);
    setWantNewDiary(false);
  };

  const handleShareLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        EventTrigger({
          action: 'click',
          category: 'share',
          label: '링크 공유하기',
          value: 1,
        });
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <div className={Styles.DisplayAnswerList}>
      {!isConnected ? (
        <div className={Styles.loading}>로딩중이에요.</div>
      ) : answererList.length ? (
        <div
          className={
            answererList.length ? Styles.haveResponse : Styles.noResponse
          }
        >
          <div className={Styles.haveResponseImg}>
            <ResponseContent content={answererCount} />
          </div>
          <div className={Styles.haveResponseTitle}>
            {answererCount}명이 질문에 답했다곰!
          </div>
          <div className={Styles.listContainer}>
            <table>
              <tbody>
                {answererList.map((person) => (
                  <tr key={person._id}>
                    <td
                      onClick={() => handleDisplayResponse(person._id)}
                      className={
                        person._id === correctAnswerer
                          ? Styles.correctAnswerer
                          : person._id === diaryId
                          ? Styles.notOwner
                          : Styles.owner
                      }
                    >
                      {person.answerer} 님의 답장
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={Styles.pageBtns}>
            <button
              className={Styles.preBtn}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <button
              className={Styles.nextBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              {'>'}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={
            answererList.length ? Styles.haveResponse : Styles.noResponse
          }
        >
          <div className={Styles.noResponsetitle}>
            아직 아무도 답하지 않았다곰...
          </div>
          <div className={Styles.noResponsecontent}>텅</div>
        </div>
      )}
      {!isDiaryOwner && (
        <div className={Styles.commonBtns}>
          <Btn text={'나도 만들기'} onClick={handleNewDiary} />
        </div>
      )}
      {isDiaryOwner && (
        <div className={Styles.commonBtns}>
          <Btn text={'새로 만들기'} onClick={handleNewDiary} />
          <WhiteBtn
            text={'링크로 공유하기'}
            onClick={() => {
              handleShareLink(`${host}/diary/${pathname}`);
            }}
          />
        </div>
      )}
      {isAnswerer && (
        <CustomModal
          message={'다이어리 주인만 볼 수 있어요.'}
          updateModal={handleModalClose}
        />
      )}
      {isCopied && (
        <CustomModal
          message={'링크를 복사했어요.'}
          updateModal={handleModalClose}
        />
      )}
      {wantNewDiary && (
        <ConfirmModal
          message={`새로 만들면 이전 다이어리는 저장됩니다.
            저장된 다이어리는 최근 답장 5개만 볼 수 있어요.`}
          updateModal={handleModalClose}
          goToFirstStep={goToFirstStep}
        />
      )}
    </div>
  );
};

export default DisplayAnswerList;

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
import ConfirmModal from '../../components/ComfirmModal';

const DisplayAnswerList = ({ goToFirstStep }) => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [answererList, setAnswererList] = useState([]);
  const [answererCount, setAnswerCount] = useState(0);
  const [answer, setAnswer] = useRecoilState(Answer);
  const [question, setQuestion] = useRecoilState(Question);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const axiosInstance = instance();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(answererCount / itemsPerPage);

  const [isOwner, setIsOwner] = useState('');
  const [isNotOwner, setIsNotOwner] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/answerers/${diaryId}/?start=${start}&take=${itemsPerPage}`)
      .then((response) => {
        if (response.status === 200) {
          setIsConnected(true);
          setAnswererList(response.data.answererList);
          setIsOwner(response.data._id);
          setAnswerCount(response.data.answerCount);
        }
      })
      .catch((e) => navigate('/error-route'));
  }, []);

  const handleDisplayResponse = (answerId) => {
    axiosInstance
      .get(`/answer/${diaryId}/${answerId}`)
      .then((response) => {
        setAnswer(response.data.answer);
        setQuestion(response.data.question);
        navigate(`/answer/${diaryId}/${answerId}`);
      })
      .catch((error) => setIsNotOwner(true));
  };

  const [wantNewDiary, setWantNewDiary] = useState(false);

  let host = window.location.origin;
  let pathname = window.location.pathname.slice(11);

  const handleNewDiary = async () => {
    const axiosInstance = instance();

    const { data: diaryData } = await axiosInstance.get('');

    if (diaryData) {
      setWantNewDiary(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setStart(start + itemsPerPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setStart(start - itemsPerPage);
      setCurrentPage(currentPage - 1);
    }
  };

  const correctAnswerer = getCookie('diaryAddress');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (correctAnswerer === diaryId) {
      setIsCorrect(true);
    }
  }, []);

  const [isCopied, setIsCopied] = useState(false);

  const handleModalClose = () => {
    setIsCopied(false);
    setIsNotOwner(false);
    setWantNewDiary(false);
  };

  const handleShareLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  return (
    <div className={Styles.DisplayAnswerList}>
      {!isConnected ? (
        <div>로딩중이에요.</div>
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

      {isCorrect && (
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
      {isNotOwner && (
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
          message={'다이어리를 다시 만드시겠어요?'}
          updateModal={handleModalClose}
          goToFirstStep={goToFirstStep}
        />
      )}
    </div>
  );
};

export default DisplayAnswerList;

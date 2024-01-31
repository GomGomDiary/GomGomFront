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

import { RoomId } from '../../store/Chat/RoomId';
import { ChatToken } from '../../store/Chat/ChatToken';
import { GuestAddress } from '../../store/Chat/GuestAddress';

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

  const [sortOrder, setSortOrder] = useState('desc');
  const handleSelectSortOrder = (e) => {
    if (e.target.value === '오래된 순') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
  };

  const axiosInstance = instance();

  useEffect(() => {
    axiosInstance
      .get(
        `diary/answerers/${diaryId}/?start=${start}&take=${itemsPerPage}&sortOrder=${sortOrder}`
      )
      .then((response) => {
        if (response.status === 200) {
          setIsConnected(true);
          setAnswererList(response.data.answererList);
          setIsDiaryOwnerId(response.data._id);
          setAnswerCount(response.data.answerCount);
        }
      })
      .catch((e) => navigate('/error-route'));
  }, [currentPage, totalPages, start, diaryId, sortOrder]);

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
      setQuestionNum(originQuestionNum);
      navigate('/');
      goToFirstStep();
      EventTrigger({
        action: '나도 만들기',
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
    setChatNotAllow(false);
    setChatNotOpen(false);
  };

  /* 채팅 기능 */
  const [roomId, setRoomId] = useRecoilState(RoomId);
  const [chatToken, setChatToken] = useRecoilState(ChatToken);
  const [guestAddress, setGuestAddress] = useRecoilState(GuestAddress);

  useEffect(() => {
    const fetchChatToken = async () => {
      try {
        /* 토큰 받기 */
        const tokenResponse = await axiosInstance.post('/chat/token');
        if (tokenResponse.status === 201) {
          const _chatToken = tokenResponse.data.chatToken;
          setChatToken(_chatToken);
        }
      } catch (error) {
        // console.error('Error fetching chat token:', error);
      }
    };
    fetchChatToken();
  }, []);

  const [chatNotAllow, setChatNotAllow] = useState(false);
  const [chatNotOpen, setChatNotOpen] = useState(false);
  const [chatNowOpen, setChatNowOpen] = useState(false);

  const handleOpenChat = async (answererId, roomId) => {
    try {
      if (!roomId) {
        /* 채팅방 생성 */
        const chatRoomResponse = await axiosInstance.post('/chat', {
          answererId,
        });
        if (chatRoomResponse.status === 201) {
          const newRoomId = chatRoomResponse.data.roomId;
          setChatNowOpen(true);
          setRoomId(newRoomId);
        }
      } else {
        setRoomId(roomId);
        setGuestAddress(answererId);
        navigate('/chat/enter_room');
      }
    } catch (error) {
      if (error && error.response.status === 400) {
        setChatNotAllow(true);
      } else if (error && error.response.status === 403) {
        setChatNotOpen(true);
      }
    }
  };

  /* fb 쿼리 파라미터 관련 & 링크 복사하기 */
  const handleShareLink = (link) => {
    const indexOfFbclid = link.indexOf('?fbclid=');
    if (indexOfFbclid !== -1) {
      link = link.substring(0, indexOfFbclid);
    }

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
      .catch((error) => {
        console.error('error', error);
      });
  };

  /* 카카오톡 공유 */
  const handleKaKaoTalk = async () => {
    if (window.Kakao) {
      const Kakao = window.Kakao;

      const kakaoAPI = process.env.REACT_APP_KAKAO_API;

      if (!Kakao.isInitialized()) {
        await new Promise((resolve) => Kakao.init(kakaoAPI, resolve));
      }

      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '곰곰다이어리',
          description: '상대에 대해 곰곰이 생각하고 답해보세요!',
          imageUrl: `${process.env.PUBLIC_URL}/image/OG_Thumb.png`,
          link: {
            mobileWebUrl: `${host}/diary/${pathname}`,
            webUrl: `${host}/diary/${pathname}`,
          },
        },
        buttons: [
          {
            title: '답장하기',
            link: {
              mobileWebUrl: `${host}/diary/${pathname}`,
              webUrl: `${host}/diary/${pathname}`,
            },
          },
        ],
      });
    }
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
            <div className={Styles.selectSortOrderWrapper}>
              <select
                className={Styles.selectSortOrder}
                onChange={handleSelectSortOrder}
              >
                <option defaultValue={'최신 순'}>최신 순</option>
                <option>오래된 순</option>
              </select>
            </div>
            <div>
              {answererList.map((person) => (
                <div className={Styles.listTable} key={person._id}>
                  <div
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
                  </div>

                  <button
                    className={Styles.chatIcon}
                    onClick={() => handleOpenChat(person._id, person.roomId)}
                  >
                    {person.roomId && person._id === correctAnswerer
                      ? '💬'
                      : !person.roomId && person._id === correctAnswerer
                      ? '📭'
                      : correctAnswerer === diaryId && person.roomId
                      ? '💬'
                      : correctAnswerer === diaryId && !person.roomId
                      ? '📭'
                      : null}
                  </button>
                </div>
              ))}
            </div>
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
          <WhiteBtn
            text={'링크로 공유하기'}
            onClick={() => {
              handleShareLink(`${host}/diary/${pathname}`);
            }}
          />
          <WhiteBtn text={'카톡으로 공유하기'} onClick={handleKaKaoTalk} />
          <Btn text={'새로 만들기'} onClick={handleNewDiary} />
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
      {chatNotAllow && (
        <CustomModal
          message={`권한이 없어요.`}
          updateModal={handleModalClose}
        />
      )}
      {chatNotOpen && (
        <CustomModal
          message={`다이어리 주인이 아직 채팅방을 열지 않았어요.`}
          updateModal={handleModalClose}
        />
      )}
      {chatNowOpen && (
        <CustomModal
          message={`이제 채팅할 수 있어요. :)`}
          updateModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default DisplayAnswerList;

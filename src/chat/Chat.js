import React, { useEffect, useState, useRef } from 'react';
import Styles from './Chat.module.css';
import Header from '../Home/Header';
import SendMessage from '../chat/SendMessage';
import ReceiveMessage from '../chat/ReceiveMessage';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { ChatToken } from '../store/chat/ChatToken';
import { RoomId } from '../store/chat/RoomId';
import instance from '../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { GuestAddress } from '../store/chat/GuestAddress';
import { getCookie } from '../api/cookie';
import CustomModal from '../components/CustomModal';

const Chat = () => {
  const chatToken = useRecoilValue(ChatToken);
  const roomId = useRecoilValue(RoomId);

  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [questioner, setQuestioner] = useState('');
  const [answerer, setAnswerer] = useState('');

  const [isEnter, setIsEnter] = useState(false);

  const guestAddress = useRecoilValue(GuestAddress);
  const diaryAddress = getCookie('diaryAddress');

  const axiosInstance = instance();

  const getNicknames = async () => {
    try {
      const nicknames = await axiosInstance.get(`/chat/${roomId}`);
      setAnswerer(nicknames.data.answerer);
      setQuestioner(nicknames.data.questioner);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const header = {
      authorization: `Bearer ${chatToken}`,
      roomid: `${roomId}`,
    };

    const newSocket = io.connect(`${process.env.REACT_APP_CHAT_WS}`, {
      extraHeaders: {
        ...header,
      },
    });

    newSocket.on('connect', () => {
      // console.log(`roomId: ${roomId}, chatToken: ${chatToken}`);
      setSocket(newSocket);
    });

    newSocket.on('exception', e => {
      console.error('에러 발생', e);
    });

    newSocket.on('disconnect', () => {
      console.log('연결 끊어짐');
      navigate(-1);
    });

    getNicknames();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      socket.on('ready', () => {
        // console.log('레디 완료');
        socket.emit('enter_room', { roomId });
        setIsEnter(true);
        // console.log('엔터룸 완료');
      });

      if (isEnter) {
        // console.log('메세지 수신 준비 완료');
        socket.on('receive_message', message => {
          const newMessage = {
            chat: message.chat,
            nickname: message.nickname,
            createdAt: new Date(),
          };

          setMessages(prevReceivedMessages => [
            ...prevReceivedMessages,
            newMessage,
          ]);
        });
      }
    }
  }, [isEnter, roomId, socket]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  const [isScaleover, setIsScaleover] = useState(false);

  const handleMessageSend = e => {
    if (socket && message.trim() !== '' && e.key === 'Enter') {
      const nickname = guestAddress === diaryAddress ? answerer : questioner;

      if (message.length <= 100) {
        const newMessage = {
          nickname: nickname,
          chat: message,
          createdAt: new Date(),
          isSender: true,
        };

        socket.emit('send_message', {
          roomId: roomId,
          chat: message,
          nickname: nickname,
        });

        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage('');
        scrollToBottom();
      } else {
        setIsScaleover(true);
      }
    }
  };

  const handleMessageInput = e => {
    setMessage(e.target.value);
  };

  /* 메세지 불러오기 */
  const [isEnd, setIsEnd] = useState(false);
  const [saveMessages, setSaveMessages] = useState([]);
  const [originNext, setOriginNext] = useState('');
  const [loading, setLoading] = useState(false);

  /* 처음 메세지 받아 오기 */
  useEffect(() => {
    fetchOriginMessages();
  }, []);

  const fetchOriginMessages = async () => {
    try {
      const loadMessage = await axiosInstance.get(
        `/chat/message/${roomId}?take=5`
      );
      // 받아온 메세지가 없으면 종료
      if (loadMessage.data.messageList.length === 0) {
        setIsEnd(true);
      } else {
        // 받아온 메세지가 있으면 업데이트 & next 업데이트 & 로딩중
        setSaveMessages(loadMessage.data.messageList);
        setOriginNext(loadMessage.data.next); // 업데이트
        setLoading(true);
      }
    } catch (e) {
      setIsEnd(true);
    }
  };

  /* 처음 메세지 next를 기준으로 다음 메세지 리스트 요청 */
  const fetchNextMessages = async next => {
    // next 값이 없으면 빈 배열 반환 (+next 값이 같아 종료된 경우)
    if (next === undefined || !next) {
      return [];
    }

    try {
      // next를 기준으로 메세지 요청
      const nextMessages = await axiosInstance.get(
        `/chat/message/${roomId}?take=5&next=${next}`
      );
      const nextList = nextMessages.data.messageList;
      setOriginNext(nextMessages.data.next);
      return nextList;
    } catch (e) {
      return [];
    }
  };

  /* 추가 데이터 받아오기 */
  const [fetching, setFetching] = useState(false);
  const [prevNext, setPrevNext] = useState('');

  const fetchMoreMessages = async () => {
    setFetching(true);
    const nextMessagesList = await fetchNextMessages(originNext);

    // 새로 받아온 메세지가 있을 경우 누적으로 저장 & next 값 갱신
    if (nextMessagesList.length > 0) {
      setSaveMessages(prev => [...nextMessagesList, ...prev]);
      setIsEnd(false);
    } else {
      setIsEnd(true);
    }

    // 이전과 현재 next 값이 같으면 요청을 보내지 않고 종료
    if (prevNext === originNext) {
      return [];
    }

    setFetching(false);
    setPrevNext(originNext);
  };

  const [prevScrollTop, setPrevScrollTop] = useState(0);

  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop;

    // 스크롤이 최상단에 닿았을 때만 추가 데이터 받기
    if (scrollTop < prevScrollTop && fetching === false) {
      fetchMoreMessages();
    } else {
      setLoading(true);
    }

    // 현재 스크롤 위치를 이전 스크롤 위치로 업데이트
    setPrevScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollTop]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages, saveMessages, scrollContainerRef]);

  const handleModalClose = () => {
    setIsScaleover(false);
  };

  return (
    <div className={Styles.Main}>
      <Header />
      <div className={Styles.Chat}>
        <div className={Styles.ChatContainer} ref={scrollContainerRef}>
          {loading && (
            <div
              className={`${Styles.chatAlarm} ${
                isEnd ? Styles.hidden : Styles.alarm
              }`}
            >
              {isEnd ? null : '스크롤을 움직여 이전 메세지를 확인해보세요.'}
            </div>
          )}
          {saveMessages.map((message, i) => (
            <div key={i}>
              {message.isSender ? (
                <SendMessage message={message} />
              ) : (
                <ReceiveMessage message={message} />
              )}
            </div>
          ))}
          {messages.map((message, i) => (
            <div key={i}>
              {message.isSender ? (
                <SendMessage message={message} />
              ) : (
                <ReceiveMessage message={message} />
              )}
            </div>
          ))}
        </div>
        <input
          className={Styles.messageInput}
          type="input"
          value={message}
          onChange={handleMessageInput}
          onKeyUp={handleMessageSend}
          placeholder="100자 이내로 입력해주세요."
        />
      </div>
      {isScaleover && (
        <CustomModal
          message={`메세지는 100자 이내로 보내주세요.`}
          updateModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default Chat;

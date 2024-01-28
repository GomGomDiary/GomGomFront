import React, { useEffect, useState, useRef } from 'react';
import Styles from './Chat.module.css';
import Header from '../Home/Header';
import SendMessage from '../chat/SendMessage';
import ReceiveMessage from '../chat/ReceiveMessage';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { ChatToken } from '../store/Chat/ChatToken';
import { RoomId } from '../store/Chat/RoomId';
import instance from '../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { GuestAddress } from '../store/Chat/GuestAddress';
import { getCookie } from '../api/cookie';

const Chat = () => {
  const chatToken = useRecoilValue(ChatToken);
  const roomId = useRecoilValue(RoomId);

  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [questioner, setQuestioner] = useState('');
  const [answerer, setAnswerer] = useState('');

  const guestAddress = useRecoilValue(GuestAddress);
  const diaryAddress = getCookie('diaryAddress');

  const getNicknames = async () => {
    try {
      const axiosInstance = instance();
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

    console.log(header);

    const newSocket = io.connect(`${process.env.REACT_APP_CHAT_WS}`, {
      extraHeaders: {
        ...header,
      },
    });

    newSocket.on('connect', () => {
      console.log(`Socket.IO 연결 성공, ${roomId}, ${chatToken}`);
      setSocket(newSocket);
    });

    newSocket.emit('enter_room', { roomId });

    newSocket.on('exception', (e) => {
      console.error('에러남: ', e);
    });

    newSocket.on('disconnect', () => {
      console.log('뒤로 돌아가기');
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
      socket.on('receive_message', (message) => {
        const newMessage = {
          chat: message.chat,
          nickname: message.nickname,
          time: new Date(),
        };

        setMessages((prevReceivedMessages) => [
          ...prevReceivedMessages,
          newMessage,
        ]);
      });
    }
  }, [socket]);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSend = (e) => {
    if (socket && message.trim() !== '' && e.key === 'Enter') {
      const nickname = guestAddress === diaryAddress ? answerer : questioner;

      const newMessage = {
        nickname: nickname,
        chat: message,
        time: new Date(),
        isSender: true,
      };

      socket.emit('send_message', {
        roomId: roomId,
        chat: message,
        nickname: nickname,
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={Styles.Chat}>
      <Header />
      <div className={Styles.ChatContainer} ref={scrollContainerRef}>
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
      />
    </div>
  );
};

export default Chat;

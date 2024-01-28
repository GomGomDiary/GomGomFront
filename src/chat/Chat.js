import React, { useEffect, useState } from 'react';
import Styles from './Chat.module.css';
import Header from '../Home/Header';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';
import { io } from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { ChatToken } from '../store/Chat/ChatToken';
import { RoomId } from '../store/Chat/RoomId';
import instance from '../api/customAxios';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const chatToken = useRecoilValue(ChatToken);
  const roomId = useRecoilValue(RoomId);

  const navigate = useNavigate('');

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const [questioner, setQuestioner] = useState('');
  const [answerer, setAnswerer] = useState('');

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

    newSocket.emit('exception', (e) => {
      console.error('에러남: ', e);
    });

    newSocket.on('disconnect', () => {
      console.log('enlfhrkdy');
      navigate(-1);
    });

    getNicknames();

    newSocket.on('receive_message', (message) => {
      console.log('수신된 메세지:', 'ㅇㅇ');
      const newReceivedMessage = {
        chat: message.text,
        nickname: message.sender,
        time: new Date(),
      };

      setReceivedMessages((prevReceivedMessages) => [
        ...prevReceivedMessages,
        newReceivedMessage,
      ]);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleMessageSend = (e) => {
    if (socket && message.trim() !== '' && e.key === 'Enter') {
      const nickname = 'answerer';
      const newMessage = { sender: nickname, text: message, time: new Date() };

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
      <div className={Styles.ChatContainer}>
        <SendMessage messages={messages} />
        <ReceiveMessage receivedMessages={receivedMessages} />
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

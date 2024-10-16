import { MdOutlineHistory } from 'react-icons/md';
import { FaBell } from 'react-icons/fa6';
import { RiMenuLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { questionerAtom } from '@/store/create/questioner';
import { questionNumberAtom } from '@/store/create/questionNumber';
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Headerbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setQuestioner = useSetAtom(questionerAtom);
  const setQuestionNumber = useSetAtom(questionNumberAtom);
  const [isBellClick, setIsBellClick] = useState(false);
  const [isMenuClick, setIsMenuClick] = useState(false);

  const handleGoToMain = () => {
    navigate('/');
    setQuestioner('');
    setQuestionNumber(5);
  };

  const handleAlarm = () => {
    setIsBellClick(isBellClick => !isBellClick);
  };

  const handleDropdown = () => {
    if (isMenuClick) {
      setIsMenuClick(false);
    } else {
      setIsMenuClick(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuClick && !dropdownRef.current?.contains(event.target as Node)) {
        setIsMenuClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuClick]);

  return (
    <StyledHeaderBar>
      <HistoryIconWrapper>
        <MdOutlineHistory />
      </HistoryIconWrapper>
      <Title onClick={handleGoToMain}>GomGom Diary 🐻💭</Title>
      <BellIconWrapper onClick={handleAlarm} $isActive={isBellClick}>
        <FaBell />
      </BellIconWrapper>
      <MenuIconWrapper onClick={handleDropdown} ref={dropdownRef}>
        <RiMenuLine />
      </MenuIconWrapper>
      {isMenuClick && (
        <Dropdown>
          <List>공식 인스타그램</List>
          <List>피드백</List>
        </Dropdown>
      )}
    </StyledHeaderBar>
  );
};

export default Headerbar;

const alarmAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const StyledHeaderBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 5px;
  height: 35px;
  background-color: var(--main-color);
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 999;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.header`
  cursor: pointer;
  position: relative;
`;

const HistoryIconWrapper = styled.div`
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  left: 0;
  margin-left: 10px;
`;

const MenuIconWrapper = styled.div`
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  right: 0;
  margin-right: 10px;
`;

const BellIconWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  cursor: pointer;
  right: 40px;

  svg {
    fill: ${({ $isActive }) => ($isActive ? 'var(--point-color)' : 'white')};
    animation: ${({ $isActive }) =>
      $isActive
        ? css`
            ${alarmAnimation} 0.5s infinite
          `
        : 'white'};
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  flex-direction: column;
  background-color: white;
  color: var(--point-color);
  border: 1px solid rgb(230, 230, 230);
  z-index: 1;
  text-align: center;
`;

const List = styled.li`
  list-style: none;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 248);
  }
`;

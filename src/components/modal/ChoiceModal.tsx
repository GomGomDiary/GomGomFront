import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  challengeAtom,
  countersignAtom,
  originQuestionArrAtom,
  originQuestionNumberAtom,
  questionArrAtom,
  questionerAtom,
  questionNumberAtom,
  rewriteDiaryAtom,
} from '@/store/question';

import { ModalProps } from './Modal';

export const ChoiceModal = ({ message, updateModal }: ModalProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const setRewriteDiary = useSetAtom(rewriteDiaryAtom);

  const setQuestioner = useSetAtom(questionerAtom);
  const setQuestionArr = useSetAtom(questionArrAtom);
  const setChallenge = useSetAtom(challengeAtom);
  const setCountersign = useSetAtom(countersignAtom);
  const setQuestionNumber = useSetAtom(questionNumberAtom);
  const originQuestionArr = useAtomValue(originQuestionArrAtom);
  const originQuestionNumber = useAtomValue(originQuestionNumberAtom);

  const handleClose = () => {
    setIsModalOpen(false);
    updateModal(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setRewriteDiary(true);

    setQuestioner('');
    setQuestionArr(originQuestionArr);
    setChallenge('');
    setCountersign('');
    setQuestionNumber(originQuestionNumber);
    navigate('/');
  };

  return (
    <>
      <Overlay $isModalOpen={isModalOpen} onClick={handleClose} />
      <ModalContainer>
        <ModalContent>
          <Message>{message}</Message>
          <ModalBtns>
            <CancelButton onClick={handleClose}>아니요</CancelButton>
            <ConfirmButton onClick={handleConfirm}>네</ConfirmButton>
          </ModalBtns>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const Overlay = styled.div<{ $isModalOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(224, 224, 224, 0.513);
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'block' : 'none')};
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150px;
  width: 315px;
  background-color: white;
  border: 1px solid var(--point-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ModalBtns = styled.div`
  display: flex;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background-color: var(--point-color);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const CancelButton = styled(ConfirmButton)`
  background-color: white;
  color: var(--point-color);
  border: 1px solid var(--point-color);
`;

const Message = styled.div`
  word-break: break-all;
  white-space: pre-line;
  text-align: center;
  line-height: 1.2;
`;

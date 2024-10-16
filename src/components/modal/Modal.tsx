import { useState } from 'react';
import styled from 'styled-components';

export interface ModalProps {
  message: string;
  updateModal: ($isOpen: boolean) => void;
}

export const Modal = ({ message, updateModal }: ModalProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  return (
    <>
      <Overlay $isOpen={modalIsOpen} onClick={handleClose} />
      <ModalContainer>
        <ModalContent>
          <Message>{message}</Message>
          <ModalBtns>
            <ConfirmButton onClick={handleClose}>확인</ConfirmButton>
          </ModalBtns>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(224, 224, 224, 0.513);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 120px;
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

const Message = styled.div`
  word-break: break-all;
  white-space: pre-line;
  text-align: center;
  line-height: 1.2;
`;

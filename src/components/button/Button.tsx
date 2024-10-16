import styled, { css } from 'styled-components';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'default' | 'white';
}

export const Button = ({ text, onClick, variant = 'default' }: ButtonProps) => {
  const StyledButton = variant === 'default' ? DefaultButton : WhiteButton;

  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const buttonStyles = css`
  display: block;
  border-radius: 20px;
  padding: 8px;
  width: 150px;
  margin: 0 auto;
  cursor: pointer;
  font-size: 14px;
`;

const DefaultButton = styled.button`
  ${buttonStyles}
  border: none;
  background-color: var(--point-color);
  color: white;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const WhiteButton = styled.button`
  ${buttonStyles}
  border: 1px solid var(--main-color);
  background-color: white;
  color: var(--point-color);

  &:hover {
    background-color: var(--main-color);
    color: white;
    border-color: var(--main-color);
  }
`;

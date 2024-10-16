import { ChangeEventHandler, forwardRef } from 'react';
import styled from 'styled-components';

export interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: () => void;
  placeholder?: string;
  maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onKeyUp, placeholder, maxLength }, ref) => {
    return (
      <StyledInput
        type="text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        ref={ref}
        maxLength={maxLength}
      />
    );
  }
);

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
  padding: 5px;
  width: 200px;
  font-size: 16px;
`;

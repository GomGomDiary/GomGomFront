import { ChangeEventHandler, forwardRef } from 'react';
import styles from './Input.module.css';

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
      <input
        className={styles.input}
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

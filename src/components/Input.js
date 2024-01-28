import React, { forwardRef } from 'react';
import Styles from './Input.module.css';

const Input = forwardRef(
  ({ value, onChange, onKeyUp, placeholder, maxLength }, ref) => {
    return (
      <input
        className={Styles.input}
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

export default Input;

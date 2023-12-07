import React from 'react';
import Styles from './Input.module.css';

const Input = React.forwardRef(
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

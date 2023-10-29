import React from 'react';
import Styles from './Input.module.css';

const Input = React.forwardRef(
  ({ value, onChange, onKeyUp, placeholder }, ref) => {
    return (
      <input
        className={Styles.input}
        type="text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);

export default Input;

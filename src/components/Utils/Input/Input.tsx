import React from 'react';
import './Input.scss';

interface PropType {
  title: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({ title, placeholder, onChange, onKeyDown }:PropType) => {
  return (
    <>
      <label className='input__label-item'>{title}</label>
      <input onKeyDown={onKeyDown} onChange={onChange} className='input__input-item' type="text" placeholder={placeholder} />
    </>
  ) 
}

export default Input;
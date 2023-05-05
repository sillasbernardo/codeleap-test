import React from 'react';
import './Textarea.scss';

interface PropType {
  title: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | number | boolean
}

const Textarea = ({ title, placeholder, onChange }:PropType) => {
  return (
    <>
      <label className='textarea__label-item'>{title}</label>
      <textarea rows={4} onChange={onChange} className='textarea__textarea-item' placeholder={placeholder} />
    </>
  ) 
}

export default Textarea;
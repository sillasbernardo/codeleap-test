import React from "react";
import "./Button.scss";

interface PropType {
  children: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  color: string | undefined;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, color, className, disabled }:PropType) => {
  return <button disabled={disabled} onClick={onClick} className={`button-item ${className} ${color}`} >{children}</button>
}

export default Button;
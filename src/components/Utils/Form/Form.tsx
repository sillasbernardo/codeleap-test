import React from "react";

import "./Form.scss";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";

interface PropType {
  className?: string;
  formTitle: string;
  titleInput: {
    value: string;
    handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    placeholder: string;
  };
  contentTextarea: {
    value: string;
    handler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    title: string;
    placeholder: string;
  };
  isValid: boolean;
  cancelBtn?: {
    value?: string;
    className?: string;
    color?: string;
    onClick?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  };
  submitBtn: {
    value: string;
    className?: string;
    color: string;
    onClick: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  };
}

const Form = ({
  className,
  formTitle,
  titleInput,
  contentTextarea,
  isValid,
  cancelBtn,
  submitBtn,
}: PropType) => {
  return (
    <form className={`${className} form__container`}>
      <h3>{formTitle}</h3>
      <Input
        value={titleInput.value}
        title={titleInput.title}
        placeholder={titleInput.placeholder}
        onChange={titleInput.handler}
      />
      <Textarea
        value={contentTextarea.value}
        title={contentTextarea.title}
        placeholder={contentTextarea.placeholder}
        onChange={contentTextarea.handler}
      />
      <div className="form__btns">
        {cancelBtn?.value && (
          <Button
            className={cancelBtn!.className}
            onClick={cancelBtn!.onClick}
            color={cancelBtn!.color}
          >
            {cancelBtn?.value}
          </Button>
        )}
        {submitBtn.value && (
          <Button
            disabled={!isValid}
            className={submitBtn.className}
            onClick={submitBtn.onClick}
            color={isValid ? submitBtn.color : ""}
          >
            {submitBtn.value}
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;

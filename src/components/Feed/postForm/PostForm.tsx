import React, { useReducer } from "react";

import Button from "../../Utils/Button/Button";
import Input from "../../Utils/Input/Input";
import Textarea from "../../Utils/Textarea/Textarea";

import "./PostForm.scss";
import {
  postFormInitialState,
  postFormReducer,
} from "./PostFormReducerHandler";

const PostForm = () => {
  // Handle form values and validity
  const [postFormState, postFormDispatch] = useReducer(
    postFormReducer,
    postFormInitialState
  );

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    postFormDispatch({
      type: "INPUT_TITLE",
      value: event.target.value,
    });
  };

  const contentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    postFormDispatch({
      type: "INPUT_CONTENT",
      value: event.target.value,
    });
  };

  const createButtonHandler = () => {

  }

  return (
    <form className="postform__container">
      <h3>What's on your mind?</h3>
      <Input
        value={postFormState.title}
        title="Title"
        placeholder="Hello world"
        onChange={titleHandler}
      />
      <Textarea
        value={postFormState.content}
        title="Content"
        placeholder="Content here"
        onChange={contentHandler}
      />
      <Button
        disabled={!postFormState.isValid}
        className="postform__btn"
        onClick={createButtonHandler}
        color={postFormState.isValid ? "blue" : ""}
      >
        Create
      </Button>
    </form>
  );
};

export default PostForm;

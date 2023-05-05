import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./PostForm.scss";
import {
  postFormInitialState,
  postFormReducer,
} from "./PostFormReducerHandler";
import { sendPost, getPosts } from "../../../actions/postFetch/FetchPosts";
import { postsAction } from "../../../redux/PostsSlice";
import Form from "../../Utils/Form/Form";

type ReduxState = {
  user: {
    user: {
      id: string,
      username: string,
      isLoggedIn: string
    }
  }
}

const PostForm = () => {

  const dispatch = useDispatch();
  const usernameState = useSelector<ReduxState, string>(state => state.user.user.username)

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

  const createButtonHandler = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();      
      // Send new post to API
      await sendPost(postFormState.title, postFormState.content, usernameState);
      const { results } = await getPosts();

      dispatch(postsAction.loadPosts({
        posts: results
      }))

      // Clear input and textarea
      postFormDispatch({
        type: "RESET_FIELDS"
      })
    } catch (error) {
      console.error("Error while posting data.")
    }
  }

  return (
    <Form
      formTitle="What's on your mind?"
      titleInput={{
        title: "Title",
        value: postFormState.title,
        placeholder: "Hello world",
        handler: titleHandler
      }}
      contentTextarea={{
        title: "Content",
        value: postFormState.content,
        placeholder: "Content here",
        handler: contentHandler
      }}
      isValid={postFormState.isValid}
      submitBtn={{
        value: "Create",
        className: "postform__btn",
        color: "blue",
        onClick: createButtonHandler
      }}
    />
  );
};

export default PostForm;

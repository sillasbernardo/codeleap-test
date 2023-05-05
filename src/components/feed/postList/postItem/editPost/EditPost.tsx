import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import './EditPost.scss';
import Form from "../../../../Utils/Form/Form"; 
import { editFormReducer, editFormInitialState } from "./EditPostReducerHandler";
import { postsAction } from "../../../../../redux/PostsSlice";
import { updatePost, getPosts } from "../../../../../actions/postFetch/FetchPosts";

interface PropType {
  closeModal: () => void;
  id: number;
  title: string;
  content: string;
}

const EditPost = ({ closeModal, id, title, content }: PropType) => { 

  const dispatch = useDispatch();

  // Handle form values and validity
  const [editPostState, editPostDispatch] = useReducer(editFormReducer, editFormInitialState);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    editPostDispatch({
      type: "INPUT_TITLE",
      value: event.target.value,
    })
  }

  const contentHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    editPostDispatch({
      type: "INPUT_CONTENT",
      value: event.target.value,
    })
  }

  const saveButtonHandler = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      // Send updated post to API
      await updatePost(id, editPostState.title, editPostState.content);
      const { results } = await getPosts();
      dispatch(postsAction.loadPosts({
        posts: results
      }))

    } catch (error) {
      console.error("Error while updating item.")
    }
  }

  const formJsxElement = (
    <Form
      className="edit-post__container"
      formTitle="Edit item"
      titleInput={{
        title: "Title",
        value: editPostState.title,
        placeholder: "Hello world",
        handler: titleHandler
      }}
      contentTextarea={{
        title: "Content",
        value: editPostState.content,
        placeholder: "Content here",
        handler: contentHandler
      }}
      isValid={editPostState.isValid}
      cancelBtn={{
        value: "Cancel",
        color: "white",
        onClick: closeModal
      }}
      submitBtn={{
        value: "Save",
        className: "edit-post__btn",
        color: "green",
        onClick: saveButtonHandler
      }}
    />
  )

  const modalRootEl = document.getElementById('modal') as HTMLElement;

  return createPortal(formJsxElement, modalRootEl)
};

export default EditPost;

import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import Button from "../../../../Utils/Button/Button";
import './DeletePost.scss';
import { deletePost } from "../../../../../actions/postFetch/FetchPosts";
import { postsAction } from "../../../../../redux/PostsSlice";
import React from "react";

interface PropType {
  closeModal: () => void;
  id: number
}

const DeletePost = ({ closeModal, id }: PropType) => {
  const dispatch = useDispatch();

  const deletePostHandler = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();

      // Delete post from redux state
      dispatch(postsAction.deletePost({
        id: id
      }))

      // Delete post on API
      await deletePost(id);
    } catch (error) {
      console.error("Error while deleting item.")
    }
  }

  const deleteUI = (
    <div className="delete-post__container">
      <h3>Are you sure you want to delete this item?</h3>
      <div className="delete-post__btns">
        <Button className="delete-post__delete-btn" onClick={closeModal} color="white">Cancel</Button>
        <Button onClick={deletePostHandler} color="red">Delete</Button>
      </div>
    </div>
  )

  const modalRootEl = document.getElementById('modal') as HTMLElement;

  return createPortal(deleteUI, modalRootEl)
}

export default DeletePost;
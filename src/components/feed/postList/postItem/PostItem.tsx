import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import "./PostItem.scss";
import { getTime } from "./postCreatedData/PostCreatedData";
import Backdrop from "../../../Utils/Backdrop/Backdrop";
import EditPost from "./editPost/EditPost";
import DeletePost from "./deletePost/DeletePost";

interface PropType {
  username: string;
  createdDate: string;
  id: number;
  content: string;
  title: string;
}

type ReduxState = {
  user: {
    user: {
      id: string;
      username: string;
      isLoggedIn: boolean;
    };
  };
};

const PostItem = ({ title, username, createdDate, id, content }: PropType) => {
  const [postOptions, setPostOptions] = useState({
    isEdit: false,
    isDelete: false,
  });

  const [isUser, setIsUser] = useState(false);
  const usernameState = useSelector<ReduxState, string>(
    (state) => state.user.user.username
  );

  // Prevent other users from deleting or editing posts
  useEffect(() => {
    if (usernameState === username) {
      setIsUser(true);
    }
  }, []);

  // Get the correct time for minutes and hours
  const createdTime = getTime(createdDate);

  // Handles post edit modal
  const editPostHandler = () => {
    setPostOptions({
      isDelete: false,
      isEdit: true,
    });
  };

  const deletePostHandler = () => {
    setPostOptions({
      isEdit: false,
      isDelete: true,
    });
  };

  const closeModalHandler = () => {
    setPostOptions({
      isEdit: false,
      isDelete: false,
    });
  };

  return (
    <>
      {(postOptions.isDelete || postOptions.isEdit) && (
        <>
          {postOptions.isEdit && (
            <EditPost
              id={id}
              closeModal={closeModalHandler}
            />
          )}
          {postOptions.isDelete && (
            <DeletePost closeModal={closeModalHandler} id={id} />
          )}
          <Backdrop closeModal={closeModalHandler} />
        </>
      )}
      <li className="post-item__container">
        <div className="post-item__header">
          <h3>{title}</h3>
          {isUser && (
            <div className="post-item__header-icons">
              <FontAwesomeIcon
                onClick={deletePostHandler}
                className="p-i-icon"
                icon={faTrashCan}
              />
              <FontAwesomeIcon
                onClick={editPostHandler}
                className="p-i-icon"
                icon={faPenToSquare}
              />
            </div>
          )}
        </div>
        <div className="post-item__main">
          <div className="post-item__info">
            <span>{`@${username}`}</span>
            <span>{createdTime}</span>
          </div>
          <p>{content}</p>
        </div>
      </li>
    </>
  );
};

export default PostItem;

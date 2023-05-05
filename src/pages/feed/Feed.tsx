import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./Feed.scss";
import PostList from "../../components/feed/postList/PostList";
import PostForm from "../../components/feed/postForm/PostForm";
import { userActions } from "../../redux/UserSlice";
import Button from "../../components/Utils/Button/Button";

const Feed = () => {
  const navigate = useNavigate();
  const userLoginSession = sessionStorage.getItem("loginId");

  const dispatch = useDispatch();

  // Redirects user to login page if userLoginId is false
  useEffect(() => {
    let timer: number;

    if (!userLoginSession) {
      timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Render unauthorized page
  if (!userLoginSession) {
    return <h3>You are not authorized.</h3>;
  } else {
    dispatch(userActions.login(JSON.parse(userLoginSession)));
  }

  const logoutHandler = () => {
    sessionStorage.removeItem("loginId");
    navigate("/login")
  }

  return (
    <main className="feed__container">
      <div className="feed__item">
        <div className="feed__header">
          <h3>CodeLeap Network</h3>
          <Button onClick={logoutHandler} color="red">Logout</Button>
        </div>
        <PostForm />
        <PostList />
        {/* form to create post */}
        {/* list of posts */}
      </div>
    </main>
  );
};

export default Feed;

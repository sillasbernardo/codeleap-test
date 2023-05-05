import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "./postItem/PostItem";
import { useSelector, useDispatch } from "react-redux";

import "./PostList.scss";
import { getPosts, loadMorePosts } from "../../../actions/postFetch/FetchPosts";
import { postsAction } from "../../../redux/PostsSlice";

type Post = {
  content: string;
  created_datetime: string;
  id: number;
  title: string;
  username: string;
};

type ReduxType = {
  posts: {
    posts: []
  }
}

const PostList = () => {
  const dispatch = useDispatch();

  // Handle infinite scrolling
  const posts = useSelector<ReduxType, Post[]>(state => state.posts.posts)
  const [offset, setOffset] = useState(0);  

  // Fetch first 10 posts
  useEffect(() => {
    const loadData = async () => {
      try {
        const { results } = await getPosts();        
          dispatch(postsAction.loadPosts({
            posts: results
          }))
          setOffset(10);
      } catch (error) {
        console.error("Error while loading posts.");
      }
    };

    loadData();
  }, []);

  // Handle next posts when scrolling
  const nextPostsHandler = async () => {
    try {
      const { results } = await loadMorePosts(offset);

      dispatch(postsAction.loadPosts({
        posts: [...posts, ...results]
      }))
      setOffset((prevOffset) => prevOffset+10);
    } catch (error) {
      console.error("Error while loading posts.");
    }
  };

  return (
    <InfiniteScroll
      className="post-list__container"
      dataLength={posts.length}
      next={nextPostsHandler}
      hasMore={true}
      loader={<h3>Loading</h3>}
      height={1000}
    >
      {posts &&
        posts.map((post) => {
          return (
            <PostItem
              key={post.id + Math.random()}
              username={post.username}
              createdDate={post.created_datetime}
              id={post.id}
              content={post.content}
              title={post.title}
            />
          );
        })}
    </InfiniteScroll>
  );
};

export default PostList;

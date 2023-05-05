import { createSlice } from "@reduxjs/toolkit";

// Type definitions
type PostType = {
  title: string;
  content: string;
  username: string;
  id?: number;
  created_datetime?: string;
}

type PostsType = {
  posts: PostType[]
}
// End

const postsInitialState = {
  posts: []
}

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    loadPosts: (state:PostsType, action) => {
      const { posts } = action.payload;

      state.posts = posts
    },
    addPost: (state:PostsType, action) => {
      const { post } = action.payload;

      state.posts = [post, ...state.posts]
    },
    updatePost: (state: PostsType, action) => {
      const { id, title, content } = action.payload;

      state.posts = state.posts.map(post => {
        if (post.id === id){
          console.log(post.id, id)
          return {
            ...post,
            title: title,
            content: content
          }
        }
        return post;
      })
    },
    deletePost: (state: PostsType, action) => {
      const { id } = action.payload;

      state.posts = state.posts.filter(post => post.id !== id);
    }
  }
})

export const postsAction = postsSlice.actions;

export default postsSlice;
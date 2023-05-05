import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./UserSlice";
import postsSlice from "./PostsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer
  }
})
import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: {
    id: "",
    username: "",
    isLoggedIn: false,
  },
};

const userSlice = createSlice({
  name: "login",
  initialState: userInitialState,
  reducers: {
    login: (state, action) => {
      const { id, username } = action.payload;

      state.user = {
        id,
        username,
        isLoggedIn: true,
      };
    },
    logout: (state) => {
      state.user = {
        id: "",
        username: "",
        isLoggedIn: false,
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

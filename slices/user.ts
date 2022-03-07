import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  id: null,
  email: "",
  nickname: "",
  imageUrl: null,
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state) {
      state.isLoading = true;
    },
    setUser(state, action) {
      state.isLoading = false;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.imageUrl = action.payload.imageUrl;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { getUser, setUser, setAccessToken } = userSlice.actions;

export default userSlice;

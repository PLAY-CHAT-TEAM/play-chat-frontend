import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface User {
  isLoading: boolean;
  email: string;
  nickname: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
}

const initialState = {
  isLoading: false,
  email: "",
  nickname: "",
  profileImage: "",
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state) {
      state.isLoading = true;
    },
    signinSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    signinFailure(state) {
      state.isLoading = false;
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

export const { signin, signinSuccess, signinFailure } = userSlice.actions;

export default userSlice;

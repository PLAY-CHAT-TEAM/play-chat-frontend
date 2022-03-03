import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  signinLoading: false,
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
    signin(state, action) {
      state.signinLoading = true;
    },
    signinSuccess(state, action) {
      state.signinLoading = false;
      state.accessToken = action.payload.accessToken;
    },
    signinFailure(state) {
      state.signinLoading = false;
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

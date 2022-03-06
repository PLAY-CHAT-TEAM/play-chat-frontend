import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  signinLoading: false,
  email: "",
  nickname: "",
  profileImage: null,
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, action) {
      state.signinLoading = true;
      state.email = "";
      state.nickname = "";
      state.profileImage = null;
      state.accessToken = "";
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
    signinSuccess(state) {
      state.signinLoading = false;
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

export const { signin, setAccessToken, signinSuccess, signinFailure } =
  userSlice.actions;

export default userSlice;

import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  signinLoading: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signin(state, action) {
      state.signinLoading = true;
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

export const { signin, signinSuccess, signinFailure } = signinSlice.actions;

export default signinSlice;

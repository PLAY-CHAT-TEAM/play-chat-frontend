import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  email: "",
  nickname: "",
  profileImage: null,
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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

export const { setAccessToken } = userSlice.actions;

export default userSlice;

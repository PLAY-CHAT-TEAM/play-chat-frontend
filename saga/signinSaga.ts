import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { setAccessToken } from "@/slices/user";
import { signinFailure, signinSuccess } from "@/slices/signin";

type signinInfo = {
  email: string;
  password: string;
};

function* workSigninUser(action: PayloadAction<signinInfo>) {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse = yield call(() => {
      return axios.post("/api/signin", {
        email,
        password,
      });
    });
    const { token } = response.data;
    yield put(setAccessToken({ accessToken: token }));
    yield call(Router.push, "/channel/1");
    yield put(signinSuccess());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(signinFailure());
    yield call(toast, axiosError.response?.data.message);
  }
}

export function* signinSaga() {
  yield takeEvery("signin/signin", workSigninUser);
}

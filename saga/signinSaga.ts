import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { signinSuccess, signinFailure } from "../slices/user";

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
    yield put(signinSuccess({ accessToken: token }));
    yield call(Router.push, "/channel/1");
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(signinFailure());
    yield call(toast, axiosError.response?.data.message);
  }
}

export function* signinSaga() {
  yield takeEvery("user/signin", workSigninUser);
}

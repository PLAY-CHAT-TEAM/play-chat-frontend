import axios, { AxiosError, AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { setUser } from "@/slices/user";
import { toast } from "react-toastify";
import Router from "next/router";

function* workGetUserInfo() {
  try {
    const response: AxiosResponse = yield call(() => {
      return axios.get("/api/members/me");
    });
    yield put(setUser(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
    yield call(Router.push, "/sign-in");
    yield call(toast, axiosError.response?.data.message);
  }
}

export function* userSaga() {
  yield takeEvery("user/getUser", workGetUserInfo);
}

import axios, { AxiosError, AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { setUser } from "@/slices/user";

function* workGetUserInfo() {
  try {
    const response: AxiosResponse = yield call(() => {
      return axios.get("/api/members/me");
    });
    yield alert(response.data);
    yield put(setUser(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
  }
}

export function* userSaga() {
  yield takeEvery("user/getUser", workGetUserInfo);
}

import { call, put, takeEvery } from "redux-saga/effects";
import { signinSuccess, signinFailure, User } from "../slices/user";

function* workSigninUser() {
  try {
    const user: Response = yield call(() => fetch("/api/signin"));
    const formattedUser: User = yield user.json();
    yield put(signinSuccess(formattedUser));
  } catch (error) {
    yield put(signinFailure());
  }
}

export function* signinSaga() {
  yield takeEvery("user/signin", workSigninUser);
}

import { all, fork } from "redux-saga/effects";
import { signinSaga } from "./signinSaga";
import { userSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([fork(signinSaga), fork(userSaga)]);
}

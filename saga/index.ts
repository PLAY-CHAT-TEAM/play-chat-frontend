import { all, fork } from "redux-saga/effects";
import { signinSaga } from "./signinSaga";

export default function* rootSaga() {
  yield all([fork(signinSaga)]);
}

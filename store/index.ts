import { applyMiddleware, createStore, Store } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import rootSaga from "saga";
import rootReducer, { RootState } from "./reducer";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: true,
});

import { applyMiddleware, compose, createStore, Store } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { Task } from "redux-saga";
import rootSaga from "saga";
import rootReducer, { RootState } from "./reducer";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "@/slices/user";
import signinSlice from "@/slices/signin";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [signinSlice.name]: signinSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

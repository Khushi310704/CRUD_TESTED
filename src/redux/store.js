import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./userSlice";
import userSaga from "./userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);

export default store;

import { configureStore } from "@reduxjs/toolkit";
import acheckerSlice from "./slices/acheckerSlice";
import { useDispatch } from "react-redux";
import pa11ySlice from "./slices/pa11ySlice";
import axeSlice from "./slices/axeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  acheckerSlice,
  pa11ySlice,
  axeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;

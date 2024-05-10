import { configureStore } from "@reduxjs/toolkit";
import acheckerSlice from "./slices/acheckerSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: { acheckerSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;

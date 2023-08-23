import { configureStore } from "@reduxjs/toolkit";
import provinceSlice from "../features/province/provinceSlice";

export const store = configureStore({
  reducer: {
    provinces: provinceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

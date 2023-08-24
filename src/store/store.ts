import { configureStore } from "@reduxjs/toolkit";
import provinceSlice from "../components/Province/provinceSlice";
import amountSlice from "../components/Amount/amountSlice";
import tipSlice from "../components/Tip/tipSlice";

export const store = configureStore({
  reducer: {
    provinces: provinceSlice.reducer,
    amount: amountSlice.reducer,
    tip: tipSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

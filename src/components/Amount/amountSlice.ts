import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type AmountState = {
  value: number;
};
const initialState: AmountState = {
  value: 0,
};
export const { actions, reducer } = createSlice({
  name: "amount",
  initialState,
  reducers: {
    addAmount(state, action: PayloadAction<number>) {
      state.value = Number(action.payload) || 0;
    },
  },
});

export const getAmount = (state: RootState) => state.amount.value;

export const { addAmount } = actions;

export default { reducer };

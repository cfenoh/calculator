import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type SelectedTip = {
  unit: string;
  value: number;
};

type TipState = {
  selectedTip: SelectedTip;
  isBeforeTaxesActive: boolean;
};

const initialState: TipState = {
  selectedTip: {
    value: 10,
    unit: " PERCENTAGE",
  },
  isBeforeTaxesActive: false,
};
export const { actions, reducer } = createSlice({
  name: "tip",
  initialState,
  reducers: {
    selectATip(state, action: PayloadAction<SelectedTip>) {
      const { unit, value } = action.payload;
      state.selectedTip = {
        unit,
        value: Number(value) || 0,
      };
    },
    toggleBeforeTaxes: function (state) {
      state.isBeforeTaxesActive = !state.isBeforeTaxesActive;
    },
  },
});

export const getSelectedTip = (state: RootState) => state.tip.selectedTip;
export const getComputedTip = createSelector(
  [
    (state: RootState) => state.amount.value,
    (state: RootState) => state.tip.selectedTip.value,
  ],
  (amount, selectedTipValue) => {
    return (amount * (selectedTipValue / 100)).toFixed(2);
  }
);

export const { selectATip, toggleBeforeTaxes } = actions;
export default { reducer };

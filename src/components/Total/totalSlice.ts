import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type TotalState = {
  taxRate: number;
  computedTip: number;
  total: number;
};

const initialState: TotalState = {
  total: 0,
  computedTip: 0,
  taxRate: 0,
};

export const { actions, reducer } = createSlice({
  name: "total",
  initialState,
  reducers: {},
});

export const getTotal = createSelector(
  [
    (state: RootState) => state.amount.value,
    (state: RootState) => state.tip,
    (state: RootState) => state.provinces.selectedProvince.value,
  ],
  (amount, tip, taxValue) => {
    const taxRate = taxValue / 100;
    const computedTaxAmount = amount * taxRate;
    const totalTaxIncludedBeforeTip = amount + computedTaxAmount;
    const computedTipRate = tip.selectedTip.value / 100;
    const computedTipAmount = tip.isBeforeTaxesActive
      ? amount * computedTipRate
      : totalTaxIncludedBeforeTip * computedTipRate;
    const total = computedTaxAmount + computedTipAmount + amount;

    return {
      tip: computedTipAmount.toFixed(2),
      tax: computedTaxAmount.toFixed(2),
      total: total.toFixed(2),
    };
  }
);

export default { reducer };

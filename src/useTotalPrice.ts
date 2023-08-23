import React from "react";

type PriceDetails = {
  total: string;
  tax: {
    percentage: string;
    amount: string;
  };
  tip: string;
};
export type TipComputationProps = {
  basePrice: number | string;
  provinceId: number;
  tipRate: number | string;
  tipUnit: string;
  shouldApplyTipOnBasePrice: boolean;
};
export const useTotalPrice = ({
  basePrice,
  provinceId,
  tipRate,
  tipUnit,
  shouldApplyTipOnBasePrice,
}: TipComputationProps): PriceDetails => {
  const [priceDetails, setPriceDetails] = React.useState<PriceDetails>({
    total: "0",
    tax: {
      percentage: "0",
      amount: "0",
    },
    tip: "0",
  });
  const provinces: [{ id: number; value: string }] = [{ id: 1, value: "ON" }];
  React.useEffect(() => {
    function getTaxRate(provinceId: number) {
      const foundTax = provinces.find(
        (province) => province.id === Number(provinceId)
      );
      return !foundTax ? 1 : Number(foundTax.value) / 100;
    }

    const priceTaxExcluded = Number(basePrice) || 0;

    const taxRate = getTaxRate(provinceId);

    const tax = priceTaxExcluded * taxRate;

    const totalTaxIncludedBeforeTip = priceTaxExcluded + tax;

    function computeTip() {
      if (tipUnit !== "percentage") {
        return Number(tipRate);
      }
      const tipInFraction = Number(tipRate) / 100;
      return shouldApplyTipOnBasePrice
        ? priceTaxExcluded * tipInFraction
        : totalTaxIncludedBeforeTip * tipInFraction;
    }

    const tip = computeTip();

    const total = (tax + tip + priceTaxExcluded).toFixed(2);

    setPriceDetails({
      total,
      tax: {
        amount: tax.toFixed(2),
        percentage: (taxRate * 100).toFixed(2),
      },
      tip: tip.toFixed(2),
    });
  }, [basePrice, provinceId, tipRate, tipUnit, shouldApplyTipOnBasePrice]);

  return priceDetails;
};

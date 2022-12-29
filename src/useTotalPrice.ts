import React from "react";
import { TAX_BY_PROVINCES } from "./taxByProvinces";

type PriceDetails = {
  total: string;
  tax: {
    percentage: string;
    amount: string;
  };
  tips: string;
};
export const useTotalPrice = ({
  basePrice,
  provinceId,
  tipRate,
  shouldApplyTipOnBasePrice,
}: {
  basePrice: number | string;
  provinceId: number;
  tipRate: number | string;
  shouldApplyTipOnBasePrice: boolean;
}): PriceDetails => {
  const [priceDetails, setPriceDetails] = React.useState<PriceDetails>({
    total: "0",
    tax: {
      percentage: "0",
      amount: "0",
    },
    tips: "0",
  });

  React.useEffect(() => {
    function getTaxRate(provinceId: number) {
      const foundTax = TAX_BY_PROVINCES.find(
        (province) => province.id === Number(provinceId)
      );
      return !foundTax ? 1 : foundTax.value;
    }
    const priceTaxEcluded = Number(basePrice) || 0;
    const taxRate = getTaxRate(provinceId);
    const tax = priceTaxEcluded * taxRate;
    const totalTaxIncludedBeforeTip = priceTaxEcluded + tax;
    const tipInFraction = Number(tipRate) / 100;
    const tip = shouldApplyTipOnBasePrice
      ? priceTaxEcluded * tipInFraction
      : totalTaxIncludedBeforeTip * tipInFraction;
    const total = (tax + tip + priceTaxEcluded).toFixed(2);

    setPriceDetails({
      total,
      tax: {
        amount: tax.toFixed(2),
        percentage: (taxRate * 100).toFixed(2),
      },
      tips: tip.toFixed(2),
    });
  }, [basePrice, provinceId, tipRate, shouldApplyTipOnBasePrice]);

  return priceDetails;
};

import React from "react";
import { TAX_BY_PROVINCES } from "./taxByProvinces";
type PriceMembers = {
  basePrice: number | string;
  provinceId: number;
  tipsPercentage: number;
};

type PriceDetails = {
  total: string;
  taxes: {
    percentage: string;
    amount: string;
  };
  tips: string;
};
export const useTotalPrice = ({
  basePrice,
  provinceId,
  tipsPercentage,
}: PriceMembers): PriceDetails => {
  const [priceDetails, setPriceDetails] = React.useState<PriceDetails>({
    total: "0",
    taxes: {
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
    const parsedPrice = Number(basePrice) || 0;
    const taxRate = getTaxRate(provinceId);
    const taxAmount = parsedPrice * taxRate;
    const intermediateTotal = parsedPrice + taxAmount;
    const tips = intermediateTotal * (Number(tipsPercentage) / 100);

    const total = (taxAmount + tips + parsedPrice).toFixed(2);
    setPriceDetails({
      total,
      taxes: {
        amount: taxAmount.toFixed(2),
        percentage: (taxRate * 100).toFixed(2),
      },
      tips: tips.toFixed(2),
    });
  }, [basePrice, provinceId, tipsPercentage]);

  return priceDetails;
};

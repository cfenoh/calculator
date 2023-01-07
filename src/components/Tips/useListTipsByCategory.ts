import { TipCategory } from "../../tips.const";
import React, { useState } from "react";

export const useListTipsByCategory = ({
  tipCategories,
  categoryId,
}: {
  tipCategories: TipCategory[];
  categoryId: TipCategory["id"];
}) => {
  const [tips, setTips] = useState<{
    tips: TipCategory["items"];
    unit: string;
  }>(() => ({
    tips: tipCategories[0].items,
    unit: tipCategories[0].unit,
  }));

  const [isLoading, setIsLoading] = useState(false);
  React.useEffect((): void => {
    setIsLoading(true);
    const foundCategory = tipCategories.find(({ id }) => id === categoryId);

    if (!foundCategory) {
      setIsLoading(false);
      return;
    }
    setTips({
      tips: foundCategory.items,
      unit: foundCategory.unit,
    });
    setIsLoading(false);
  }, [categoryId, tipCategories]);

  return tips;
};

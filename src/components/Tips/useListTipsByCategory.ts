import { Service } from "../../tips.const";
import React, { useState } from "react";

export const useListTipsByCategory = ({
  tipCategories,
  categoryId,
}: {
  tipCategories: Service[];
  categoryId: Service["id"];
}) => {
  const [tips, setTips] = useState<{
    tips: Service["tips"];
    unit: string;
  }>(() => ({
    tips: tipCategories[0].tips,
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
      tips: foundCategory.tips,
      unit: foundCategory.unit,
    });
    setIsLoading(false);
  }, [categoryId, tipCategories]);

  return tips;
};

import React from "react";
import { Input } from "reactstrap";
import { SelectableCategoriesProps } from "../../tips.const";

type CategoriesSelectorProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: SelectableCategoriesProps;
};
const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({
  categories,
  onChange,
}) => {
  return (
    <div>
      <Input
        type={"select"}
        id={"categoryId"}
        name={"categoryId"}
        onChange={onChange}
        className={"text-capitalize"}
      >
        {categories.map(({ id, label }) => (
          <option key={id} value={id} className={"text-uppercase"}>
            {label}
          </option>
        ))}
      </Input>
    </div>
  );
};

export default CategoriesSelector;

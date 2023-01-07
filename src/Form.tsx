import React, { useRef } from "react";
import {
  Col,
  Container,
  Form as FormStrap,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTotalPrice } from "./useTotalPrice";
import { TAX_BY_PROVINCES } from "./taxByProvinces";
import { useTipForm } from "./useTipForm";
import ProvinceSelector from "./components/ProvinceSelector/ProvinceSelector";
import CategoriesSelector from "./components/CategoriesSelector/CategoriesSelector";
import { useListTipsByCategory } from "./components/Tips/useListTipsByCategory";
import {
  _getTipUnitSymbol,
  Categories,
  extractInitialTipCategorySubset,
} from "./components/CategoriesSelector/helper";
import { tipCategories } from "./tipCategories";

export default function Form() {
  const recommendedInputTipRef = useRef<HTMLInputElement>(null);
  const { initialCategoryId } = extractInitialTipCategorySubset(tipCategories);
  const [
    { price, provinceId, categoryId, tip, shouldApplyTipOnBasePrice },
    handleChange,
  ] = useTipForm({
    price: "",
    provinceId: 1,
    tip: 0,
    categoryId: initialCategoryId,
    shouldApplyTipOnBasePrice: false,
  });

  const categoryTips = useListTipsByCategory({
    tipCategories,
    categoryId: categoryId,
  });
  const {
    total,
    tips: computedTips,
    tax,
  } = useTotalPrice({
    basePrice: price,
    provinceId,
    tipRate: tip,
    shouldApplyTipOnBasePrice,
  });

  return (
    <Container className={"p-4"}>
      <Row>
        <Col
          className={
            "d-flex flex-row justify-content-between align-items-center align-content-center"
          }
        >
          <h1
            className={"m-0"}
            style={{
              color: "#191D23",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "27px",
            }}
          ></h1>
          <ProvinceSelector
            onChange={handleChange}
            provinces={TAX_BY_PROVINCES}
            defaultIndex={6}
          />
        </Col>
      </Row>

      <FormStrap>
        <FormGroup className={"mb-4 mt-3"}>
          <Label for="price">
            Price
            <span className={"fs-0 text-muted ms-0 fst-italic"}>
              (excl. taxes)
            </span>
          </Label>
          <Input
            value={price}
            placeholder={"0"}
            name={"price"}
            id={"price"}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onChange={handleChange}
            type={"number"}
            className={"form-base-input rounded-1"}
          />
        </FormGroup>

        <FormGroup>
          <Label>Select a service</Label>
          <Row>
            <Col>
              <CategoriesSelector
                categories={Categories}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tips">How was the service ?</Label>
          <Row xs={3} lg={5} className={"gy-2 mt-2"}>
            {categoryTips.tips.map(({ rating, value, isRecommendedAmount }) => {
              const id = `radio-${value}`;
              let innerRef = undefined;
              if (isRecommendedAmount && !Number(tip)) {
                innerRef = recommendedInputTipRef;
                const input = recommendedInputTipRef.current;
                if (input) {
                  input.value = String(value);
                  input.dispatchEvent(new Event("change", { bubbles: true }));
                }
              }

              return (
                <Col key={value}>
                  <Input
                    innerRef={innerRef}
                    type={"radio"}
                    name={"tip"}
                    value={value}
                    color={"secondary"}
                    checked={tip ? Number(tip) === value : isRecommendedAmount}
                    className={"btn-check"}
                    id={id}
                    onChange={handleChange}
                  />
                  <Label
                    check
                    className={
                      "btn btn-outline-success tip-radio-label d-flex justify-content-evenly align-items-center"
                    }
                    for={id}
                  >
                    <span className={"fs-2 text-capitalize"}>{rating}</span> -{" "}
                    {value}
                    {_getTipUnitSymbol(categoryTips.unit)}
                  </Label>
                </Col>
              );
            })}
            <Col>
              <InputGroup>
                <Input
                  type={"text"}
                  name={"tips"}
                  value={tip}
                  id={"custom-tip"}
                  className={
                    "tip-radio-label rounded-start-1 placeholder-fst-italic"
                  }
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  placeholder={"Ex:20"}
                  onChange={handleChange}
                />
                <InputGroupText>%</InputGroupText>
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup check className={"mt-4"}>
          <Input
            type="checkbox"
            id={"shouldApplyTipOnBasePrice"}
            name={"shouldApplyTipOnBasePrice"}
            className={"input-checkbox me-3"}
            onChange={handleChange}
            checked={shouldApplyTipOnBasePrice}
          />
          <Label check for={"shouldApplyTipOnBasePrice"}>
            Apply tip before taxes
          </Label>
        </FormGroup>
      </FormStrap>
      <ListGroup flush className={"mt-5 border-dotted pt-3 fw-normal"}>
        <ListGroupItem className={"border-0 d-flex justify-content-between"}>
          <span>
            Taxes{" "}
            <span className={"fs-0 text-muted ms-1"}>({tax.percentage}%)</span>
          </span>
          <span className={"fs-6"}>{tax.amount}</span>
        </ListGroupItem>
        <ListGroupItem className={"border-0 d-flex justify-content-between"}>
          <span>
            Tip
            <span className={"fs-0 text-muted ms-1"}>({tip}%)</span>
          </span>
          <span className={"fs-6"}>{computedTips}</span>
        </ListGroupItem>
      </ListGroup>
      <Row className={"total-result mt-1 align-items-center rounded"}>
        <Col className={"col-xs-2"}>
          Total <span className={"text-muted fs-0"}>incl. taxes</span>
        </Col>
        <Col className={"text-end fs-1"}>{total}</Col>
      </Row>
    </Container>
  );
}

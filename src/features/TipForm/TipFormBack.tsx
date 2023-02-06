import React, { SyntheticEvent, useReducer, useRef } from "react";
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
import { useTotalPrice } from "../../useTotalPrice";
import { PROVINCES } from "../../taxByProvinces";
import { FormState, FormTipReducer, useTipForm } from "../../useTipForm";
import ProvinceSelector from "../../components/ProvinceSelector/ProvinceSelector";
import CategoriesSelector from "../../components/CategoriesSelector/CategoriesSelector";
import { useListTipsByCategory } from "../../components/Tips/useListTipsByCategory";
import { _getTipUnitSymbol } from "../../components/CategoriesSelector/helper";
import tip from "../../components/Tips/Tip";
import { serviceList } from "../../serviceList";
import TipSelector from "../../components/TipSelector/TipSelector";

export default function TipFormBack() {
  const initialValues: FormState = {
    price: 0,
    selectedProvinceId: 1,
    selectedCategoryId: 1,
    categories: serviceList,
    tip: {
      suggested: 0,
      selected: 0,
      unit: "",
      note: "",
      rating: "",
    },
    shouldApplyTipOnBasePrice: false,
  };
  const [state, dispatch] = useReducer(FormTipReducer, initialValues);
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {};
  const { tips: serviceTips, unit } = useListTipsByCategory({
    tipCategories: state.categories,
    categoryId: state.selectedCategoryId,
  });
  const {
    total,
    tip: computedTip,
    tax,
  } = useTotalPrice({
    basePrice: state.price,
    province: state.selectedProvinceId,
    tipRate: state.tip.selected,
    tipUnit: state.tip.unit,
    shouldApplyTipOnBasePrice: state.shouldApplyTipOnBasePrice,
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
            provinces={PROVINCES}
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
            value={state.price}
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
          <Row>
            <Col>
              <CategoriesSelector
                categories={serviceList}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tips">How was the service ?</Label>
          <Row xs={4} lg={5} className={"gy-2 mt-2"}>
            <TipSelector
              tips={serviceTips}
              unit={unit}
              onChange={handleChange}
            />
            <Col>
              <InputGroup>
                <Input
                  type={"text"}
                  name={"tip"}
                  value={state.tip.selected}
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
                <InputGroupText>{_getTipUnitSymbol(unit)}</InputGroupText>
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>

        {unit === "percentage" ? (
          <FormGroup check className={"mt-4"}>
            <Input
              type="checkbox"
              id={"shouldApplyTipOnBasePrice"}
              name={"shouldApplyTipOnBasePrice"}
              className={"input-checkbox me-3"}
              onChange={handleChange}
              checked={state.shouldApplyTipOnBasePrice}
            />
            <Label check for={"shouldApplyTipOnBasePrice"}>
              Apply tip before taxes
            </Label>
          </FormGroup>
        ) : null}
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
            <span className={"fs-0 text-muted ms-1"}>
              <>
                {" "}
                ({tip} {_getTipUnitSymbol(unit)})
              </>
            </span>
          </span>
          <span className={"fs-6"}>{computedTip}</span>
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

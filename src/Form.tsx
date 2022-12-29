import React from "react";
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
import { TIPS } from "./tips.const";
import ProvinceSelector from "./components/ProvinceSelector/ProvinceSelector";

export default function Form() {
  const [{ price, provinceId, tips, shouldApplyTipOnBasePrice }, handleChange] =
    useTipForm();
  const {
    total,
    tips: computedTips,
    tax,
  } = useTotalPrice({
    basePrice: price,
    provinceId,
    tipRate: tips,
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
          />
        </Col>
      </Row>

      <FormStrap>
        <FormGroup className={"mb-4 mt-3"}>
          <Label for="price">
            Price
            <span className={"fs-0 text-muted ms-0 fst-italic"}>
              (excl tax)
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
            className={"form-base-input"}
          />
        </FormGroup>

        <FormGroup>
          <Label for="tips">Tip</Label>
          <Row xs={4} className={"gy-2"}>
            <InputGroup className={"mb-2"}>
              <Input
                value={tips || 0}
                name={"tips"}
                id={"tips"}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={handleChange}
                type={"text"}
                className={"form-base-input"}
              />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
            {TIPS.map((currentTip) => {
              const id = `radio-${currentTip}`;
              return (
                <Col key={currentTip}>
                  <Input
                    type={"radio"}
                    name={"tips"}
                    value={currentTip}
                    color={"secondary"}
                    checked={Number(tips) === currentTip}
                    className={"btn-check"}
                    id={id}
                    onChange={handleChange}
                  />
                  <Label
                    check
                    className={"btn btn-outline-success tip-control-label"}
                    for={id}
                  >
                    {currentTip}%
                  </Label>
                </Col>
              );
            })}
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
            Apply Tip on the base price
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
            <span className={"fs-0 text-muted ms-1"}>({tips}%)</span>
          </span>
          <span className={"fs-6"}>{computedTips}</span>
        </ListGroupItem>
      </ListGroup>
      <Row className={"total-result mt-1 align-items-center"}>
        <Col className={"col-xs-2"}>
          Total <span className={"text-muted fs-0"}>incl tax</span>
        </Col>
        <Col className={"text-end fs-1"}>{total}</Col>
      </Row>
    </Container>
  );
}

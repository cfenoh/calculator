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
import { useFormTotal } from "./useFormTotal";
import { TIPS } from "./tips.const";
import ProvinceSelector from "./components/ProvinceSelector/ProvinceSelector";

export default function Form() {
  const [{ price, provinceId, tips }, handleChange] = useFormTotal();
  const {
    total,
    tips: computedTips,
    taxes,
  } = useTotalPrice({ basePrice: price, provinceId, tipsPercentage: tips });

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
          >
            Tip&Tax
          </h1>
          <ProvinceSelector
            onChange={handleChange}
            provinces={TAX_BY_PROVINCES}
          />
        </Col>
      </Row>

      <FormStrap>
        <FormGroup className={"mb-4 mt-3"}>
          <Label for="price">Price HT</Label>
          <Input
            value={price}
            placeholder={"0"}
            name={"price"}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onChange={handleChange}
            type={"number"}
          />
        </FormGroup>

        <FormGroup>
          <Label for="tips">Tips</Label>
          <Row xs={4} className={"gy-2"}>
            <InputGroup className={"mb-2"}>
              <Input
                value={tips}
                name={"tips"}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={handleChange}
                type={"number"}
              />
              <InputGroupText>%</InputGroupText>
            </InputGroup>
            {TIPS.map((tip) => {
              const id = `radio-${tip}`;
              return (
                <Col key={tip}>
                  <Input
                    type={"radio"}
                    name={"tips"}
                    value={tip}
                    color={"secondary"}
                    checked={Number(tips) === tip}
                    className={"btn-check"}
                    id={id}
                    onChange={handleChange}
                  />
                  <Label
                    check
                    className={"btn btn-outline-success tip-control-label"}
                    for={id}
                  >
                    {tip}%
                  </Label>
                </Col>
              );
            })}
          </Row>
        </FormGroup>
      </FormStrap>
      <ListGroup flush className={"mt-5 border-dotted pt-3 fw-normal"}>
        <ListGroupItem className={"border-0 d-flex justify-content-between"}>
          <span>
            Taxes{" "}
            <span className={"fs-0 text-muted ms-1"}>
              ({taxes.percentage}%)
            </span>
          </span>
          <span className={"fs-6"}>{taxes.amount}</span>
        </ListGroupItem>
        <ListGroupItem className={"border-0 d-flex justify-content-between"}>
          <span>
            Tips
            <span className={"fs-0 text-muted ms-1"}>({tips}%)</span>
          </span>
          <span className={"fs-6"}>{computedTips}</span>
        </ListGroupItem>
      </ListGroup>
      <Row className={"total-result mt-1 align-items-center"}>
        <Col className={"col-xs-2"}>Total TTC</Col>
        <Col className={"text-end fs-1"}>{total}</Col>
      </Row>
    </Container>
  );
}

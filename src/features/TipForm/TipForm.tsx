import {
  Col,
  Container,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import React from "react";

function TipForm() {
  const { t } = useTranslation("form");
  return (
    <Container className={"p-4"}>
      <Row>{t("heading")}</Row>
      <Row>
        <Col>
          <select>
            <option value="1">QC</option>
            <option value="2">ON</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label htmlFor={"price"}>{t("price.label")}</Label>
          <input type="number" name={"price"} id={"price"} defaultValue={0} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label htmlFor={"service"}>{t("service.label")}</Label>
          <select id={"service"}>
            <option value="1">Restau</option>
            <option value="2">Coffee Shop</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label htmlFor={"tip-10"}>10</Label>
          <Input type={"radio"} name={"tip"} id={"tip-10"} value={"10"} />
        </Col>
        <Col>
          <Label htmlFor={"tip-12"}>12</Label>
          <Input
            type={"radio"}
            name={"tip"}
            id={"tip-12"}
            value={"12"}
            defaultChecked={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem title={"tax"}>0.00</ListGroupItem>
            <ListGroupItem title={"tip"}>0.00</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{t("total")} :</span>
          <span title={"total"} id={"some"}>
            0.00
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default TipForm;

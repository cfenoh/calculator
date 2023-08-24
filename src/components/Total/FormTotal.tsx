import React from "react";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { _getTipUnitSymbol } from "../Tip/CategoriesSelector/helper";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import { getTotal } from "./totalSlice";
import { getSelectedProvince } from "../Province/provinceSlice";
import { getSelectedTip } from "../Tip/tipSlice";

const FormTotal = () => {
  const { t } = useTranslation("form");
  const { value: taxRate } = useAppSelector(getSelectedProvince);
  const selectedTip = useAppSelector(getSelectedTip);
  const { tax, tip, total } = useAppSelector(getTotal);
  return (
    <>
      <ListGroup flush className={"mt-5 border-dotted pt-3 fw-normal"}>
        <ListGroupItem
          title={"tax"}
          className={"border-0 d-flex justify-content-between"}
        >
          <span>
            {t("taxes.label")}
            <span className={"fs-0 text-muted ms-1"} title={"Province-taxes"}>
              ({taxRate}%)
            </span>
          </span>
          <span className={"fs-6"} title={"tax-amount"}>
            {tax}
          </span>
        </ListGroupItem>
        <ListGroupItem
          title={"tip"}
          className={"border-0 d-flex justify-content-between"}
        >
          <span>
            {t("tip.computed")}
            <span className={"fs-0 text-muted ms-1"} title={"chosen-tip"}>
              <>
                ({selectedTip.value} {_getTipUnitSymbol(selectedTip.unit)})
              </>
            </span>
          </span>
          <span className={"fs-6"} title={"computed-tip"}>
            {tip}
          </span>
        </ListGroupItem>
      </ListGroup>
      <Row className={"total-result mt-1 align-items-center rounded"}>
        <Col className={"col-xs-2"}>
          {t("total")}{" "}
          <span className={"text-muted fs-0"}>({t("taxes.included")})</span>
        </Col>
        <Col className={"text-end fs-1"} title={"total"}>
          {total}
        </Col>
      </Row>
    </>
  );
};

export default FormTotal;

import React from "react";
import { useTotalPrice } from "../../useTotalPrice";
import { useFormikContext } from "formik";
import { Inputs } from "./types";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { _getTipUnitSymbol } from "../../components/CategoriesSelector/helper";
import { useTranslation } from "react-i18next";

const FormTotal = () => {
  const { t } = useTranslation("form");
  const { values } = useFormikContext<Inputs>();
  const {
    total,
    tip: computedTip,
    tax: provinceTax,
  } = useTotalPrice({
    basePrice: parseFloat(values.price?.replace(",", ".")),
    provinceId: Number(values.provinceId) || 1,
    tipRate: Number(values.tip) || 0,
    tipUnit: values.tipUnit || "percentage",
    shouldApplyTipOnBasePrice: values.shouldApplyTipBeforeTax,
  });

  return (
    <>
      <ListGroup flush className={"mt-5 border-dotted pt-3 fw-normal"}>
        <ListGroupItem
          title={"tax"}
          className={"border-0 d-flex justify-content-between"}
        >
          <span>
            {t("taxes.label")}
            <span className={"fs-0 text-muted ms-1"} title={"province-taxes"}>
              ({provinceTax.percentage}%)
            </span>
          </span>
          <span className={"fs-6"} title={"tax-amount"}>
            {provinceTax.amount}
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
                ({values.tip} {_getTipUnitSymbol(values.tipUnit)})
              </>
            </span>
          </span>
          <span className={"fs-6"} title={"computed-tip"}>
            {computedTip}
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

import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useField } from "formik";
import { SelectableServices } from "../../features/TipForm/types";

type ServiceSelectorProps = {
  services: SelectableServices;
};
const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services }) => {
  const { t } = useTranslation(["form", "services"]);
  const [field] = useField("serviceId");
  return (
    <FormGroup>
      <Row>
        <Col>
          <Label htmlFor={"serviceId"}>{t("service.label")}</Label>
          <div>
            <Input
              type={"select"}
              id={"serviceId"}
              className={"text-capitalize"}
              {...field}
            >
              {services.map(({ id, transKey }) => (
                <option key={id} value={id} className={"text-uppercase"}>
                  {t(transKey, { ns: "services" })}
                </option>
              ))}
            </Input>
          </div>
        </Col>
      </Row>
    </FormGroup>
  );
};

export default ServiceSelector;

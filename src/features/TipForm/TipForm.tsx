import React from "react";
import { Container, Form as FormStrap } from "reactstrap";
import { TipFormProps } from "./types";
import TipFormHeader from "./TipFormHeader";
import { Formik } from "formik";
import { DEFAULT_PROVINCE_ID, DEFAULT_SERVICE_ID } from "./data.const";
import { getServiceById, getSuggestedTipByServiceId } from "./helper";
import ServiceSelector from "../../components/CategoriesSelector/ServiceSelector";
import { TipSelector } from "../../components/TipSelector/TipSelector";
import FormTotal from "./FormTotal";
import BasePrice from "../../components/BasePrice/BasePrice";
import TipConfigToggle from "../../components/TipConfigToggle/TipConfigToggle";

const TipForm: React.FC<TipFormProps> = ({ services }) => {
  return (
    <Container className={"p-4"}>
      <Formik
        initialValues={{
          price: "",
          provinceId: DEFAULT_PROVINCE_ID.toString(),
          serviceId: DEFAULT_SERVICE_ID.toString(),
          tipUnit: getServiceById(DEFAULT_SERVICE_ID)?.unit,
          tip: getSuggestedTipByServiceId(DEFAULT_SERVICE_ID),
          shouldApplyTipBeforeTax: false,
        }}
        onSubmit={console.log}
      >
        {({ values }) => (
          <FormStrap>
            <TipFormHeader />
            <BasePrice />
            <ServiceSelector services={services} />
            {values.tipUnit === "percentage" && <TipConfigToggle />}
            <TipSelector />
            <FormTotal />
          </FormStrap>
        )}
      </Formik>
    </Container>
  );
};

export default TipForm;

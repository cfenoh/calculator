import React from "react";
import { Container, Form as FormStrap } from "reactstrap";
import Header from "./Header";
import { Formik } from "formik";
import FormTotal from "../../components/Total/FormTotal";
import Amount from "../../components/Amount/Amount";
import { Tip } from "../../components/Tip/Tip";

const Form: React.FC = () => {
  return (
    <Container className={"p-4"}>
      <Formik
        initialValues={{
          shouldApplyTipBeforeTax: false,
        }}
        onSubmit={console.log}
      >
        {(_) => (
          <FormStrap>
            <Header />
            <Amount />
            <Tip />
            <FormTotal />
          </FormStrap>
        )}
      </Formik>
    </Container>
  );
};

export default Form;

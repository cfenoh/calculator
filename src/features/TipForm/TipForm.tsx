import {
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import React from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { serviceList } from "../../serviceList";
import { Service, Tip } from "../../tips.const";
import tip from "../../components/Tips/Tip";
import { useTotalPrice } from "../../useTotalPrice";
import { Province } from "../../taxByProvinces";
import { NestedTipSelector } from "../../components/TipSelector/TipSelectable";
type Inputs = {
  price: number;
  province: string;
  service: string;
  shouldApplyTipBeforeTax: boolean;
  tip: string;
};

type TipFormProps = {
  provinces: Province[];
  services: Service[];
};
const TipForm: React.FC<TipFormProps> = ({ provinces, services }) => {
  const { t } = useTranslation("form");
  const DEFAULT_SERVICE_ID = 1;
  const DEFAULT_PROVINCE_ID = 6;
  const methods = useForm<Inputs>({
    defaultValues: {
      price: 0,
      province: DEFAULT_PROVINCE_ID.toString(),
      service: DEFAULT_SERVICE_ID.toString(),
      shouldApplyTipBeforeTax: false,
      tip: getSuggestedTipByServiceId(DEFAULT_SERVICE_ID),
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;
  const serviceId = watch("service");
  const values = useWatch({ control });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const {
    total,
    tip: computedTip,
    tax: provinceTax,
  } = useTotalPrice({
    basePrice: Number(values.price),
    provinceId: Number(values.province) || 1,
    tipRate: Number(values.tip) || 0,
    tipUnit: "percentage",
    shouldApplyTipOnBasePrice: !!values.shouldApplyTipBeforeTax,
  });

  return (
    <Container className={"p-4"}>
      <Row>{t("heading")}</Row>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <select
                {...register("province")}
                aria-label={"province"}
                className={"border-0 text-success text-uppercase"}
              >
                {provinces.map((province) => (
                  <option
                    value={province.id}
                    key={province.id}
                    className={"text-uppercase"}
                  >
                    {province.shortName}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <FormGroup>
            <Label htmlFor={"price"}>{t("price.label")}</Label>
            <input type="text" id={"price"} {...register("price")} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor={"service"}>{t("service.label")}</Label>
            <select
              id={"service"}
              {...register("service")}
              className={"text-capitalize"}
            >
              {services.map((service) => (
                <option
                  value={service.id}
                  key={service.id}
                  className={"text-uppercase"}
                >
                  {service.label}
                </option>
              ))}
            </select>
          </FormGroup>
          <Row>
            <NestedTipSelector serviceId={serviceId} />
          </Row>

          <FormGroup>
            <Label check htmlFor={"shouldApplyTipBeforeTax"}>
              {t("shouldApplyTipBeforeTax")}
            </Label>
            <input
              type={"checkbox"}
              className={"input-checkbox me-3"}
              id={"shouldApplyTipBeforeTax"}
              {...register("shouldApplyTipBeforeTax")}
            />
          </FormGroup>
        </Form>
      </FormProvider>
      <ListGroup flush className={"mt-1 border-dotted pt-3 fw-normal"}>
        <ListGroupItem
          title={"tax"}
          className={"border-0 d-flex justify-content-between"}
        >
          <span className={"fs-6"}>{provinceTax.amount}</span>
        </ListGroupItem>
        <ListGroupItem
          title={"tip"}
          className={"border-0 d-flex justify-content-between"}
        >
          <span className={"fs-6"}>{computedTip}</span>
        </ListGroupItem>
      </ListGroup>
      <Row className={"total-result mt-1 align-items-center rounded"}>
        <Col className={"col-xs-2"}>
          {t("total")} <span className={"text-muted fs-0"}>incl. taxes</span>
        </Col>
        <Col className={"text-end fs-1"} title={"total"}>
          {total}
        </Col>
      </Row>
    </Container>
  );
};

export default TipForm;

const getServiceById = (serviceId: string | number): Service => {
  return (
    serviceList.find((service) => service.id === Number(serviceId)) ||
    serviceList[0]
  );
};
const getSuggestedTipByServiceId = (serviceId: string | number) => {
  const foundService = getServiceById(serviceId);
  return foundService.tips.find((tip) => tip.isSuggested)?.value.toString();
};

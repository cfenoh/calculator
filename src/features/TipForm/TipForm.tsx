import {
  Col,
  Container,
  Form,
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
              <select {...register("province")} aria-label={"province"}>
                {provinces.map((province) => (
                  <option value={province.id} key={province.id}>
                    {province.shortName}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label htmlFor={"price"}>{t("price.label")}</Label>
              <input type="text" id={"price"} {...register("price")} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label htmlFor={"service"}>{t("service.label")}</Label>
              <select id={"service"} {...register("service")}>
                {services.map((service) => (
                  <option value={service.id} key={service.id}>
                    {service.label}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <NestedTipSelector serviceId={serviceId} />
          </Row>
          <Row>
            <Col>
              <Label htmlFor={"shouldApplyTipBeforeTax"}>
                {t("shouldApplyTipBeforeTax")}
              </Label>
              <input
                type={"checkbox"}
                id={"shouldApplyTipBeforeTax"}
                {...register("shouldApplyTipBeforeTax")}
              />
            </Col>
          </Row>
        </Form>
      </FormProvider>

      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem title={"tax"}>{provinceTax.amount}</ListGroupItem>
            <ListGroupItem title={"tip"}>{computedTip}</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{t("total")} :</span>
          <span title={"total"} id={"some"}>
            {total}
          </span>
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

import {
  Col,
  Container,
  Form,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import React from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { serviceList } from "../../serviceList";
import { Service } from "../../tips.const";
import tip from "../../components/Tips/Tip";
import { useTotalPrice } from "../../useTotalPrice";
import { PROVINCES } from "../../taxByProvinces";
type Inputs = {
  price: number;
  province: string;
  service: string;
  shouldApplyTipBeforeTax: boolean;
  tip: string;
};
function TipForm() {
  const { t } = useTranslation("form");
  const DEFAULT_SERVICE_ID = 1;
  const DEFAULT_PROVINCE_ID = 6;
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      price: 0,
      province: DEFAULT_PROVINCE_ID.toString(),
      service: DEFAULT_SERVICE_ID.toString(),
      shouldApplyTipBeforeTax: false,
      tip: getSuggestedTipByServiceId(DEFAULT_SERVICE_ID),
    },
  });
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
  console.log(values.province);
  return (
    <Container className={"p-4"}>
      <Row>{t("heading")}</Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <select {...register("province")}>
              {PROVINCES.map((province) => (
                <option value={province.id} key={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor={"price"}>{t("price.label")}</Label>
            <input type="number" id={"price"} {...register("price")} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor={"service"}>{t("service.label")}</Label>
            <select id={"service"} {...register("service")}>
              {serviceList.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.label}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label htmlFor={"tip-10"}>10</Label>
            <input
              type={"radio"}
              id={"tip-10"}
              value={"10"}
              {...register("tip")}
            />
          </Col>
          <Col>
            <Label htmlFor={"tip-12"}>12</Label>
            <input
              type={"radio"}
              id={"tip-12"}
              value={"12"}
              defaultChecked={true}
              {...register("tip")}
            />
          </Col>
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
}

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

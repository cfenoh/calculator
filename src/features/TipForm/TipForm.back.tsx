import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import React from "react";
import {
  Controller,
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
import { TipSelector } from "../../components/TipSelector/TipSelector";
import { _getTipUnitSymbol } from "../../components/CategoriesSelector/helper";
type Inputs = {
  price: number;
  province: string;
  service: string;
  shouldApplyTipBeforeTax: boolean;
  tip: string;
  tipUnit: string;
};

type TipFormProps = {
  provinces: Province[];
  services: Service[];
};
const TipFormBack: React.FC<TipFormProps> = ({ provinces, services }) => {
  const { t } = useTranslation("form");
  const DEFAULT_SERVICE_ID = 1;
  const DEFAULT_PROVINCE_ID = 6;
  const methods = useForm<Inputs>({
    defaultValues: {
      price: 0,
      province: DEFAULT_PROVINCE_ID.toString(),
      service: DEFAULT_SERVICE_ID.toString(),
      shouldApplyTipBeforeTax: false,
      tipUnit: getServiceById(DEFAULT_SERVICE_ID)?.unit,
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
    tipUnit: values.tipUnit || "percentage",
    shouldApplyTipOnBasePrice: !!values.shouldApplyTipBeforeTax,
  });
  return (
    <Container className={"p-4"}>
      <Row>{t("heading")}</Row>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <label htmlFor={"provinceId"} aria-hidden={true} hidden={true}>
                select a province
              </label>
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
            <Controller
              control={control}
              name={"price"}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
                    <Label for="price">
                      {t("price.label")}
                      <span className={"fs-0 text-muted ms-0 fst-italic"}>
                        (excl. taxes)
                      </span>
                    </Label>
                    <Input
                      value={
                        field.value
                          .toString()
                          .replace(",", ".")
                          .replace(/[^\d.]/g, "")
                          .replace(/\.{2,}/g, "")
                          .replace(/^0+/, "") || 0
                      }
                      name={"price"}
                      id={"price"}
                      onBlur={field.onBlur}
                      onKeyDown={(e) => {
                        return (
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        );
                      }}
                      onChange={field.onChange}
                      type={"text"}
                      className={"form-base-input rounded-1"}
                    />
                  </>
                );
              }}
            />
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
            <TipSelector serviceId={serviceId} />
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
          <span>
            Taxes{" "}
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
            {t("tip")}
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
          {t("total")} <span className={"text-muted fs-0"}>incl. taxes</span>
        </Col>
        <Col className={"text-end fs-1"} title={"total"}>
          {total}
        </Col>
      </Row>
    </Container>
  );
};

export default TipFormBack;

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

import React from "react";
import numeral from 'numeral'
import {Col, Container, Form as FormStrap, FormGroup, Input, InputGroup, InputGroupText, Label, Row} from "reactstrap";
import {useTotalPrice} from "./useTotalPrice";
import {TAX_BY_PROVINCES} from "./taxByProvinces";
import {useFormTotal} from "./useFormTotal";
import {TIPS} from "./tips.const";

export default function Form() {
    const [{price, provinceId, tips}, handleChange] = useFormTotal()
    const total = useTotalPrice({price, provinceId, tipsPercentage: tips})

    return <Container className={'p-4'}>
        <Row>
            <Col className={'d-flex flex-column justify-content-start'}>
                <div className={'d-flex flex-row align-items-end align-content-center'}>
                    <span className="material-symbols-outlined text-success">
                        point_of_sale
                    </span>
                    <span className={''} style={{
                        letterSpacing: '-0.02em',
                        fontSize: '14px',
                        color: '#047857',
                        fontWeight: 300
                    }}>Tip&Tax</span>
                </div>

                <h1 className={'m-0'} style={{
                    color: '#191D23',
                    fontSize: '20px',
                    fontWeight: 600,
                    lineHeight: '27px'
                }}> Calculate a price</h1>
            </Col>
        </Row>
        <FormGroup className={'mb-4 mt-3'}>
            <Label for="provinceId">
                Province
            </Label>
            <Input
                type={"select"}
                id={"provinceId"}
                name={"provinceId"}
                onChange={handleChange}
            >
                {
                    TAX_BY_PROVINCES.map(({name, id, value}) => {
                        return (<option
                            key={id} value={id}>{name}-{numeral(value).format('0.00%')}</option>)
                    })
                }
            </Input>
        </FormGroup>
        <FormStrap>
            <FormGroup className={'mb-4'}>
                <Label for="price">
                    Price HT
                </Label>
                <Input
                    value={price}
                    placeholder={'0'}
                    name={'price'}
                    onKeyDown={e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                    onChange={handleChange}
                    type={'number'}
                />
            </FormGroup>

            <FormGroup>
                <Label for="tips">
                    Tips
                </Label>
                <Row xs={4} className={'gy-2'}>
                    <InputGroup className={'mb-2'}>
                        <Input
                            value={tips}
                            name={'tips'}
                            onKeyDown={e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                            onChange={handleChange}
                            type={'number'}
                        />
                        <InputGroupText>
                            %
                        </InputGroupText>
                    </InputGroup>
                    {
                        TIPS.map(tip => {
                            const id = `radio-${tip}`
                            return <Col key={tip}>
                                <Input type={'radio'}
                                       name={"tips"}
                                       value={tip}
                                       color={'secondary'}
                                       checked={Number(tips) === tip}
                                       className={'btn-check'}
                                       id={id}
                                       onChange={handleChange}/>
                                <Label check className={'btn btn-outline-success tip-control-label'} for={id}>
                                    {tip}%
                                </Label>
                            </Col>;
                        })
                    }
                </Row>

            </FormGroup>
        </FormStrap>

        <Row className={'total-result mt-5 align-items-center'}>
            <Col className={'col-xs-2'}>Total TTC</Col>
            <Col className={'text-end fs-3'}>{total}</Col>
        </Row>
    </Container>
}


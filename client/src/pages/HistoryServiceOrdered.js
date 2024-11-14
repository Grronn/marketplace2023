import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, deleteServiceOrdered, getHistoryServiceOrderedCustomer, getServiceOrderedCustomer, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { HISTORY_SERVICE_ORDERED, ORDERED_SERVICES_CUSTOMER_ROUTE, ORDERED_SERVICES_MASTER_ROUTE } from '../utils/consts';
import { Form, Radio } from 'antd';
import { Input } from 'antd';
import { createReview, createReviewUpdate } from '../http/reviewAPI';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';

const { TextArea } = Input;

const OrderedServices = () => {
    const { user } = useContext(Context)
    const [servicesdata, setServicesdata] = useState([])

    const { id } = useParams()
    const [modalReview, setModalReview] = useState(false)
    const [serviceOrderedId, setServiceOrderedId] = useState()
    const [serviceId, setServiceId] = useState()
    const [serviceName, setServiceName] = useState()
    const [masterId, setMasterId] = useState()
    const [masterName, setMasterName] = useState()
    const [loading, setLoading] = useState(true)
    const history = useNavigate()

    const [newCoords1, setNewCoords1] = useState(0);
    const [newCoords2, setNewCoords2] = useState(0);

    let arrcoord = []

    const [modalAddress, setModalAddress] = useState(false)
    useEffect(() => {


        getHistoryServiceOrderedCustomer(id).then(data => setServicesdata(data)).finally(() => setLoading(false))

        // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

    }, [])
    if (loading) {
        return <Spinner animation={"grow"} />
    }
    console.log("Customer")
    console.log(servicesdata)

    const address = (address) => {
        // var str = master.coord
        console.log(address)
        if (address !== undefined) {
            arrcoord = address.split(',')
            setNewCoords1(Number(arrcoord[0]))
            setNewCoords2(Number(arrcoord[1]))

            console.log(newCoords1)
            console.log(newCoords2)

            console.log(arrcoord)
        } else {
            console.log('The variable has an undefined value')
        }
        setModalAddress(true)

    }
    const review = (service_ordered_id, masterid, masteriame, serviceid, servicename) => {
        setServiceOrderedId(service_ordered_id)
        setMasterId(masterid)
        setMasterName(masteriame)
        setServiceId(serviceid)
        setServiceName(servicename)
        setModalReview(true)


    }

    const onFinish = (value) => {


        let text = value["reviewtext"]
        let rate = value["rate"]
        console.log(serviceOrderedId, id, serviceId, rate, text, masterId)
        createReview(serviceOrderedId, id, serviceId, rate, text, masterId)
        createReviewUpdate(serviceOrderedId)
        setModalReview(false)
        // let date = value["date"].format("YYYY-MM-DD")
        // let time = value["time"]
        // let datetime=date+" "+time
        // createServiceOrdered(id, user.user.id, serviceId,datetime)
        // console.log(date, time)
    }
    return (
        <Container style={{ marginTop: 30 }}>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <Container>
                    <h2>Я заказал</h2>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>

                    {user.user.role == "MASTER" ?
                        <Button variant={"outline-dark"} style={{ whiteSpace: 'nowrap', marginBottom: 10 }} onClick={() => history(ORDERED_SERVICES_MASTER_ROUTE + "/" + user.user.id)}>У меня заказали</Button> : <></>
                    }
                </Container>
            </Container>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => history(ORDERED_SERVICES_CUSTOMER_ROUTE + "/" + user.user.id)}>Услуги которые вы заказали</h3>
                <h3 style={{ cursor: 'pointer' }} onClick={() => history(HISTORY_SERVICE_ORDERED + "/" + user.user.id)}>История заказов</h3>
                {/* <Button variant={"outline-dark"} onClick={() => history()}>История заказов</Button> */}
            </Container>



            {servicesdata.length > 0 ?
                servicesdata.map(service =>
                    <Card className=' my-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 15 }} border='dark'  >
                        <span style={{ fontSize: 22, fontWeight: 500 }}>Услуга </span>

                        <Container style={{ display: 'flex', flexDirection: "row", borderTop: '1px solid #C0C0C0' }}>
                            <Image width={100} height={100} src={process.env.REACT_APP_API_URL + service.service_image} className='my-2 mx-2 rounded' />
                            <Container style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Название: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_name}</span>
                                        </div>
                                    </Container>
                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Стоимость: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{service.cost}</span>
                                        </div>
                                    </Container>
                                    <Container style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Информация: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{service.info}</span>
                                        </div>
                                    </Container>

                                </Container>
                                <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>



                                    <Container style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Дата и время: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_date}</span>
                                        </div>
                                    </Container>

                                </Container>
                            </Container>
                        </Container >
                        <span style={{ fontSize: 22, fontWeight: 500 }}>Мастер </span>

                        <Container style={{ display: 'flex', flexDirection: "row", borderTop: '1px solid #C0C0C0' }}>
                            <Image width={100} height={100} src={process.env.REACT_APP_API_URL + service.image_master} className='my-2 mx-2 rounded' />
                            <Container style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                                <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>

                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>{service.fio}</span>
                                        </div>
                                    </Container>

                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>

                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Адрес: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }} onClick={() => address(service.coord)}>
                                            <span style={{ fontSize: 20, fontWeight: 400, color: "blue", cursor: 'pointer' }} >Просмотреть адрес</span>
                                        </div>


                                    </Container>



                                </Container>
                                <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                                    <Container style={{ display: 'flex', flexDirection: 'row', height: 40 }}>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Номер: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{service.phone_number}</span>
                                        </div>
                                    </Container>
                                </Container>
                                
                            </Container>

                        </Container>

                        <Container style={{ display: 'flex', width: 300, alignItems: 'center', height: 'auto', width: 'auto' }}>
                            {/* <span style={{ textAlign:'center',border: '1px solid blue', 'border-radius': "10px",paddingRight:5,paddingLeft:5 }}>Ожидание ответа</span> */}
                            {service.review == false ?
                                <Button style={{ backgroundColor: "#47A76A", borderColor: "#47A76A" }} onClick={() => review(service.service_ordered_id, service.usermaster_id, service.fio, service.service_id, service.service_name)}>Оставить отзыв</Button>
                                :
                                <span style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>Отзыв оставлен</span>
                            }
                        </Container>
                    </Card>

                )
                :

                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: window.innerHeight - 214 }} >
                    <h3>Пусто</h3>
                </Container>
            }



            {/* {servicesdata.length > 0 ?
                <>
                    {servicesdata.map(service =>
                        <Card className=' my-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 7 }} border='dark'  >

                            <Container>
                                <Container className='d-flex flex-row'>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Название: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_name}</span>
                                    </div>
                                </Container>
                                <Container className='d-flex flex-row'>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Стоимость: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{service.cost}</span>
                                    </div>
                                </Container>

                            </Container>
                            <Container>
                                <Container className='d-flex flex-row'>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Мастер: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{service.fio}</span>
                                    </div>
                                </Container>
                                <Container className='d-flex flex-row'>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Дата и время: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_date}</span>
                                    </div>
                                </Container>
                                <Container className='d-flex flex-row'>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Номер телефона: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{service.phone_number}</span>
                                    </div>
                                </Container>
                            </Container>
                            <Container style={{ display: 'flex', width: 300, alignItems: 'center', height: 'auto', width: 'auto' }}>
                                
                                {service.review == false ?
                                    <Button style={{ backgroundColor: "#47A76A", borderColor: "#47A76A" }} onClick={() => review(service.service_ordered_id, service.usermaster_id, service.fio, service.service_id, service.service_name)}>Оставить отзыв</Button>
                                    :
                                    <span style={{ textAlign: 'center' }}>Отзыв оставлен</span>
                                }
                            </Container>
                        </Card>

                    )
                    }
                </>
                :

                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: window.innerHeight - 104 }} >
                    <h3>Пусто</h3>
                </Container>
            } */}
            <Modal
                className='my-2'
                show={modalReview}

                onHide={() => setModalReview(false)}
                centered

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Напишите отзыв
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <Form onFinish={onFinish} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Container style={{ display: 'flex', alignItems: 'start', flexDirection: 'row' }}>
                            <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                <h6>Мастер</h6>{masterName}
                            </Container>
                            <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                <h6>Услуга</h6>{serviceName}
                            </Container>
                        </Container>

                        <Form.Item name="reviewtext" style={{ width: '100%', marginTop: 10 }}>
                            <TextArea style={{ width: '100%', height: 100 }} showCount maxLength={150} />
                        </Form.Item>
                        <Form.Item name="rate">
                            <Radio.Group>
                                <Radio value={1}>1</Radio>
                                <Radio value={2}>2</Radio>
                                <Radio value={3}>3</Radio>
                                <Radio value={4}>4</Radio>
                                <Radio value={5}>5</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Container style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Подтвердить
                            </Button>
                        </Container>

                    </Form>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <Modal
                className='my-2'
                show={modalAddress}
                size="lg"
                onHide={() => setModalAddress(false)}
                centered

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">

                        Адрес
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 'auto' }}>
                    <YMaps>
                        <div style={{ width: 350, height: 350 }}>
                            <Map style={{ width: 350, height: 350 }} defaultState={{ center: [newCoords1, newCoords2], zoom: 17 }}
                                /*onClick={(event) => {
                                    const coords = event.get("coords");
                                    setNewCoords(() => coords);
                                }}*/>
                                <Placemark geometry={[newCoords1, newCoords2]} />


                            </Map>

                        </div>
                    </YMaps>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default OrderedServices
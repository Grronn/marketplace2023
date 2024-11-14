import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row/*, Form*/ } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { fetchTypeServices, getTypesUserServices } from '../http/typeServicesAPI';
import { createService, createServiceOrdered, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { DatePicker, TimePicker } from 'antd/lib';
import { Form, Radio, Upload } from 'antd';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import { getReview } from '../http/reviewAPI';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';
import { ACCOUNT } from '../utils/consts';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createTimesheet } from '../http/userAPI';
const { TextArea } = Input;
// import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";
// import loadYmap from "../test";
// import * as ymaps3 from 'ymaps3';

// ymaps3.ready.then(() => {
//   const {YMaps} = ymaps3;
//   new YMaps({});
// });

const AccountPage = () => {
    const [master, setMaster] = useState({})
    const { user } = useContext(Context)
    const [typesid, setTypesid] = useState([])
    const [servicesdata, setServicesdata] = useState([])
    const [reviewsData, setReviewsData] = useState([])
    const [chooseDate, setchooseDate] = useState(false)
    const [showReviews, setshowReviews] = useState(false)
    const [serviceId, setServiceId] = useState()
    const [serviceDate, setServiceDate] = useState()
    const [serviceTime, setServiceTime] = useState()
    const arr = new Array();
    const [typesname, setTypesname] = useState([])
    const history = useNavigate()
    // const coordins = new Array();
    const { id } = useParams()
    const [newCoords, setNewCoords] = useState([
        57.10866091324924, 65.58472962323376
    ]);


    const { typeServices } = useContext(Context)
    const [type_service_id, setType_service_id] = useState('')
    const [name, setName] = useState('')
    const [info, setInfo] = useState('')
    const [cost, setCost] = useState('')
    const [service_image, setService_image] = useState(null)
    const [chooseTypes, setchooseTypese] = useState(false)
    const [modalService, setModalService] = useState(false)

    const [modalTimesheet, setModalTimesheet] = useState(false)

    const [timeArray, setTimeArray] = useState([])
    const [addressStr, setAddressStr] = useState('');
    // let arrcoord = []
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([0, 0])
    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 17
    }
    const [addressText, setAddressText] = useState('')
    const addTime = () => {
        setTimeArray([...timeArray, { timeValue: '', number: Date.now() }])
        console.log(timeArray)
    }
    const removeTime = (number) => {
        setTimeArray(timeArray.filter(i => i.number !== number))
        console.log(timeArray)
    }
    const changeTime = (key, value, number) => {
        setTimeArray(timeArray.map(i => i.number === number ? { ...i, [key]: value } : i))
        console.log(timeArray)
    }
    // const state = { coordinates: null };

    // const geocode = (ymaps) => {
    //   ymaps.geocode('Мытищи')
    //     .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
    // }
    const createServiceButton = () => {
        setModalService(true)
    }

    const createTimesheetButton = () => {
        setModalTimesheet(true)
    }

    const selectFile = e => {
        setService_image(e.target.files[0])
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const func = () => {
        setchooseTypese(false)
        console.log(type_service_id)
    }
    const onFinish = (value) => {
        try {
            const formData = new FormData()
            formData.append('user_id', user.user.id)
            formData.append('type_service_id', type_service_id)
            formData.append('name', value["name"])
            formData.append('info', value["info"])
            formData.append('cost', value["cost"])
            formData.append('service_image', service_image)



            createService(formData).then(setModalService(false))

            // let data;
            // data = await becomeMasterfunction(user.user.id, FIO, info, education, file)
            // history(MASTERS_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }
    const onFinishTime = (value) => {
        for (let i = 0; i < timeArray.length; i++) {
            createTimesheet(user.user.id, timeArray[i].timeValue, value["date"].format("DD-MM-YYYY"))
        }
        console.log(value["date"].format("DD-MM-YYYY"))
        console.log(timeArray)
        setModalTimesheet(false)
    }

    const click = async () => {
        try {
            const formData = new FormData()
            formData.append('user_id', user.user.id)
            formData.append('type_service_id', type_service_id)
            formData.append('name', name)
            formData.append('info', info)
            formData.append('cost', cost)
            formData.append('service_image', service_image)



            createService(formData).then(setModalService(false))

            // let data;
            // data = await becomeMasterfunction(user.user.id, FIO, info, education, file)
            // history(MASTERS_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }

    var str = master.coord
    let arrcoord = ""
    if (str !== undefined) {
        arrcoord = str.split(',')
        console.log(arrcoord)
    } else {
        console.log('The variable has an undefined value')
    }
    // console.log(typeof str)
    // var arrcoord = str.split(',')
    // console.log(arrcoord)
    useEffect(() => {
        fetchOneMaster(user.user.id).then(data => setMaster(data))
        getTypesUserServices(user.user.id).then(data => setTypesid(data))
        getServicesMaster(user.user.id).then(data => setServicesdata(data))
        getReview(user.user.id).then(data => setReviewsData(data))
        fetchTypeServices().then(data => typeServices.setTypeServices(data))

        // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

    }, [])


    const loadMap = (ymaps) => {

        setAddressStr(master.address)
        console.log(master.address)
        ymaps.geocode(master.address).then(result => getAddress(ymaps, result.geoObjects.get(0).geometry.getCoordinates()))
        // ymaps.geocode(geoCodecCoordinates).then(result => console.log(result.geoObjects.get(0).getAddressLine()))
        // getAddress()
        // if (address !== undefined) {
        //     arrcoord = address.split(',')
        //     setNewCoords1(Number(arrcoord[0]))
        //     setNewCoords2(Number(arrcoord[1]))

        //     console.log(newCoords1)
        //     console.log(newCoords2)

        //     console.log(arrcoord)
        // } else {
        //     console.log('The variable has an undefined value')
        // }
        // setModalAddress(true)

    }

    const getAddress = (ymaps, coord) => {
        setGeoCodecCoordinates(coord)
        console.log(coord)
        ymaps.geocode(coord).then(result => setAddressText(result.geoObjects.get(0).getAddressLine()))
        // ymaps.geocode(coord).then(result => console.log(result.geoObjects.get(0).Balloon))
        // ymaps.geocode(geoCodecCoordinates).then(result => console.log(result.geoObjects.get(0).getAddressLine()))
        // if (address !== undefined) {
        //     arrcoord = address.split(',')
        //     setNewCoords1(Number(arrcoord[0]))
        //     setNewCoords2(Number(arrcoord[1]))

        //     console.log(newCoords1)
        //     console.log(newCoords2)

        //     console.log(arrcoord)
        // } else {
        //     console.log('The variable has an undefined value')
        // }
        // setModalAddress(true)

    }
    // coordins = str.split(",");
    // console.log(coordins)
    // getTypesUserServicesname(typesid[0].type_service_id).then(data => setTypesname([...typesname, data]))

    // function init(){

    //   let map=new loadYmap.ymaps.Map('map',{
    //     center:[57.10869267858511,65.58481876923126],
    //     zoom:17
    //   })

    // }
    // loadYmap.yandexMap.ready(init)

    // let map;
    // funcMap();
    // async function funcMap() {
    //   // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
    //   await loadYmap.ymaps3.ready;

    //   // Создание карты
    //   map = new loadYmap.ymaps3.YMap(document.getElementById('map-test'), {
    //     location: {
    //       // Координаты центра карты
    //       // Порядок по умолчанию: «долгота, широта»
    //       center: [55.205247, 25.077816],

    //       // Уровень масштабирования
    //       // Допустимые значения: от 0 (весь мир) до 21.
    //       zoom: 10
    //     }
    //   });

    //   // Добавляем слой для отображения схематической карты
    //   map.addChild(new loadYmap.ymaps3.YMapDefaultSchemeLayer());
    // }



    // console.log(typesid)

    console.log(typesid)

    const order = (serviceid) => {
        setServiceId(serviceid)
        setchooseDate(true)


    }

    // const onFinish = (value) => {
    //     setchooseDate(false)
    //     let date = value["date"].format("YYYY-MM-DD")
    //     let time = value["time"]
    //     let datetime = date + " " + time
    //     createServiceOrdered(id, user.user.id, serviceId, datetime)
    //     console.log(date, time)
    // }
    const show = (a) => {
        setshowReviews(a)
    }


    // for(let i=0; i<arr.length;i++){
    //   console.log(arr[i])
    // }

    return (
        <Container className="d-flex justify-content-center p-auto" style={{ flexDirection: 'column' }}>
            <Container style={{ display: 'flex', flexDirection: 'row', paddingTop: 30 }}>
                <Container>
                    <h2>Ваш аккаунт</h2>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}>
                    <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap' }} onClick={() => createServiceButton()}>Добавить услугу</Button>

                    <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap', marginLeft: 10, marginRight: 10 }} onClick={() => createTimesheetButton()}>Добавить расписание</Button>

                    <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap' }} onClick={() => createTimesheetButton()}>Изменить информацию</Button>
                </Container>
            </Container>

            <Container style={{ /*border: '1px solid', 'border-radius': "10px"*/ }} border='dark' className='d-flex flex-row mt-3 w-100' >
                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + master.image_master} className='my-5 mx-5 rounded' />
                <Container className='my-5'>
                    <Container className='d-flex flex-row'>
                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Имя:</span>
                        </div>
                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.fio}</span>
                        </div>
                    </Container>
                    <Container className='d-flex flex-row align-items-bottom mt-3'>
                        <div style={{ display: 'flex', 'align-items': 'start' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Информация:</span>
                        </div>
                        <div style={{ display: 'flex', 'align-items': 'start', "margin-left": 10 }}>
                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.info}</span>
                        </div>
                    </Container>
                    <Container className='d-flex flex-row mt-3'>
                        <div style={{ display: 'flex', 'align-items': 'start' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Образование:</span>
                        </div>
                        <div style={{ display: 'flex', 'align-items': 'start', "margin-left": 10 }}>
                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.education}</span>
                        </div>
                    </Container>
                    <Container className='d-flex flex-row mt-3' style={{ flexFlow: 'wrap', alignItems: 'center' }}>
                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Услуги:</span>
                        </div>
                        {typesid.map(type =>
                            <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10, border: '1px solid', 'border-radius': "20px", paddingLeft: 5, paddingRight: 5, height: 30, whiteSpace: 'nowrap' }}>
                                <span style={{ fontSize: 20, fontWeight: 400 }}>{type.type_name}</span>
                            </div>
                        )}

                    </Container>
                    <Container className='d-flex flex-row mt-3'>
                        <div style={{ display: 'flex', 'align-items': 'start' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Адрес:</span>
                        </div>
                        <div style={{ display: 'flex', 'align-items': 'start', "margin-left": 10 }}>
                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.address}</span>
                        </div>
                    </Container>
                    {/* <div id="map-test" class="map-test" style={{ width: 550, height: 550 }}></div> */}

                </Container>
                <YMaps
                    query={{
                        ns: "use-load-option",
                        apikey: "d549cf0f-3594-4469-85e0-f79590ba0672",
                        load: "package.full"
                        // load: "загружаемые модули"
                    }}
                >
                    <div style={{ width: 350, height: 350 }}>
                        <Map style={{ width: 350, height: 350 }} state={mapState}
                            onLoad={ymaps => loadMap(ymaps)}

                        >
                            <Placemark geometry={[geoCodecCoordinates[0], geoCodecCoordinates[1]]}

                                properties={
                                    {
                                        balloonContentHeader: addressStr,
                                        balloonContentBody: addressText


                                    }} />

                        </Map>

                    </div>
                </YMaps>



            </Container>
            <hr size="10px" />
            <Container>

            </Container>
            {showReviews == false ?
                <Container style={{ display: 'flex', flexDirection: 'row', 'align-items': 'flex-start', 'justify-content': 'space-around' }}>

                    <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(false)}>
                        <span style={{ fontSize: 24, fontWeight: 500 }}>Услуги</span>
                    </div>
                    <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(true)}>
                        <span style={{ fontSize: 24, fontWeight: 500, color: '#C0C0C0' }}>Отзывы</span>
                    </div>

                </Container>
                :
                <Container style={{ display: 'flex', flexDirection: 'row', 'align-items': 'flex-start', 'justify-content': 'space-around' }}>

                    <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(false)}>
                        <span style={{ fontSize: 24, fontWeight: 500, color: '#C0C0C0' }}>Услуги</span>
                    </div>
                    <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(true)}>
                        <span style={{ fontSize: 24, fontWeight: 500 }}>Отзывы</span>
                    </div>

                </Container>
            }


            {showReviews == false ?
                <Services servicesdata={servicesdata} />
                :
                <Reviews reviewsData={reviewsData} />

            }
            <Modal
                show={modalService}
                onHide={() => setModalService(false)}
                centered
                layout="vertical"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление услуги
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <Form onFinish={onFinish} layout="vertical" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 'auto' }}>
                        <Form.Item name="name" label="Название" style={{ marginBottom: 3 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="info" label="Информация" style={{ marginBottom: 3 }}>
                            <TextArea style={{ width: '100%', height: 100 }} showCount maxLength={150} />
                        </Form.Item>
                        <Form.Item name="cost" label="Стоимость" style={{ marginBottom: 3 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="file" label="Фото" valuePropName="fileList" getValueFromEvent={normFile} onChange={selectFile} style={{ marginBottom: 3 }}>
                            <Upload action="/upload.do" listType="picture-card" >
                                <div>
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <span style={{ fontSize: 16, fontWeight: 500 }}>Выберите тип услуги</span>
                        <Container style={{ display: 'flex', flexDirection: 'row' }}>
                            {typesid.map(type =>
                                <div style={{ "margin-left": 10 }}>
                                    <fieldset>
                                        <input
                                            key={type.id}
                                            class="form-check-input"
                                            type="radio"
                                            value={type.name}
                                            id={type.id}
                                            onClick={() => setType_service_id(type.type_id)}
                                        />
                                        <label style={{ "margin-left": 5 }} for={type.id}>{type.name}</label>
                                    </fieldset>
                                </div>
                                // <MasterItem key={master.id} master={master} />
                            )}
                        </Container>
                        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>

                </Modal.Footer>
            </Modal>
            <Modal
                show={modalTimesheet}
                onHide={() => setModalTimesheet(false)}
                centered
                layout="vertical"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление расписания
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <Form onFinish={onFinishTime} layout="vertical" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 'auto' }}>
                        <Form.Item name="date" style={{ display: 'flex', justifyContent: 'center' }}>
                            <DatePicker format={"DD-MM-YYYY"} key="date" style={{ width: 140, marginBottom: 10 }} placement="bottomRight" placeholder='Выберите дату' getPopupContainer={(triggerNode) => {
                                return triggerNode.parentNode;
                            }} />
                        </Form.Item>
                        {/* <Form.Item name="date">
                            <TimePicker format={'HH:mm'} style={{ width: 140, marginBottom: 10 }} placement="bottomRight" placeholder='Выберите время' getPopupContainer={(triggerNode) => {
                                return triggerNode.parentNode;
                            }} />
                        </Form.Item> */}
                        <Button
                            variant={"outline-dark"}
                            onClick={addTime}
                        >
                            Добавить время
                        </Button>

                        {timeArray.map(i =>
                            <Container key={i.number} style={{ display: 'flex', height: 40, marginTop: 10 }}>

                                <Form.Item style={{ display: 'flex' }}>
                                    <TimePicker
                                        key={i.number}

                                        onOk={(time) => changeTime('timeValue', time.format('HH:mm'), i.number)}
                                        format={'HH:mm'}
                                        style={{ width: 140, marginRight: 10 }}
                                        placement="bottomRight"
                                        placeholder='Выберите время'
                                        getPopupContainer={(triggerNode) => {
                                            return triggerNode.parentNode;
                                        }}

                                    />
                                </Form.Item>



                                <Button
                                    onClick={() => removeTime(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>

                            </Container>
                        )}
                        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>

                </Modal.Footer>
            </Modal>
            {/* <Modal
                show={modalTimesheet}
                onHide={() => setModalTimesheet(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавление расписания
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите название услуги'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Информация об услуге'
                            value={info}
                            onChange={e => setInfo(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Стоимость'
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            onChange={selectFile}
                            type='file'
                        />
                        <span style={{ fontSize: 16, fontWeight: 500 }}>Выберите тип услуги</span>
                        <Container style={{ display: 'flex', flexDirection: 'row' }}>
                            {typesid.map(type =>
                                <div style={{ "margin-left": 10 }}>
                                    <fieldset>
                                        <input
                                            key={type.id}
                                            class="form-check-input"
                                            type="radio"
                                            value={type.name}
                                            id={type.id}
                                            onClick={() => setType_service_id(type.type_id)}
                                        />
                                        <label style={{ "margin-left": 5 }} for={type.id}>{type.name}</label>
                                    </fieldset>
                                </div>
                                // <MasterItem key={master.id} master={master} />
                            )}
                        </Container>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant={'outline-success'}
                        onClick={click}
                    >
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </Container>
    )
}

export default AccountPage
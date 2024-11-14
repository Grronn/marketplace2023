import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row, Spinner, /*Form*/ } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { fetchTypeServices, getTypesUserServices } from '../http/typeServicesAPI';
import { createTask, getRespondMasters, getTask, getTaskHistoryCustomers, getTaskOrdered, getTaskOrderedCustomers } from '../http/taskAPI';
import { createServiceOrdered, deleteServiceOrdered, getServiceOrderedCustomer, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { HISTORY_SERVICE_ORDERED, ORDERED_SERVICES_CUSTOMER_ROUTE, TASKS_CUSTOMER_ROUTE, TASKS_MASTER_ROUTE } from '../utils/consts';
import { DatePicker, Form, Radio, Upload, Select, Space } from 'antd';
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TaskCustomer from '../components/TasksPage/TaskCustomer';
import RespondedTaskCustomer from '../components/TasksPage/RespondedTaskCustomer';
import HistoryTaskCustomer from '../components/TasksPage/HistoryTaskCustomer';
import { PlusOutlined } from '@ant-design/icons';
import { YMaps, Map, Placemark, RouteEditor, Baloon } from '@pbe/react-yandex-maps';
import { MapComponent } from '../components/MapComponent';
const { Option } = Select;


const { TextArea } = Input;

const TasksCustomerPage = () => {
    const { user } = useContext(Context)
    const [servicesdata, setServicesdata] = useState([])
    const [taskData, setTaskData] = useState([])
    const [taskOrdered, setTaskOrdered] = useState([])
    const [taskHistoryCustomer, setTaskHistoryCustomer] = useState([])
    // const [masterResponsedData, setmasterResponsedData] = useState([])
    const [master, setMaster] = useState({})
    const { id } = useParams()
    const [modalTask, setModalTask] = useState(false)
    const [modalMasters, setmodalMasters] = useState(false)
    const [name, setName] = useState('')
    const [info, setInfo] = useState('')
    const [file, setFile] = useState(null)
    const [cost, setCost] = useState('')
    const [chooseSection, setChooseSection] = useState(1)
    const history = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [newCoords, setNewCoords] = useState([
        0, 0
    ])
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([0, 0])
    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 16
    };
    const [inputValue, setInputValue] = useState('')
    const [mapRef, setMapRef] = useState()
    const [addressText, setAddressText] = useState('')
    const [typeservicesdata, setTypeServicesdata] = useState([])
    const [selecttypeservicesdata, setSelectTypeServicesdata] = useState()
    useEffect(() => {
        getServiceOrderedCustomer(id).then(data => setServicesdata(data)).finally(() => setLoading(false))
        getTask(user.user.id).then(data => setTaskData(data))
        getTaskOrderedCustomers(user.user.id).then(data => setTaskOrdered(data))
        getTaskHistoryCustomers(user.user.id).then(data => setTaskHistoryCustomer(data))
        fetchTypeServices().then(data => setTypeServicesdata(data))
        // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s
    }, [])
    if (loading) {
        return <Spinner animation={"grow"} />
    }
    const createTaskButton = () => {
        // var myGeocoder = ymaps.geocode("Moscow");
        // console.log(myGeocoder)
        setModalTask(true)
    }
    const onChange = event => {
        // console.log(event.target.value)
        const address = event.target.value
        setInputValue(address)


    }
    const changeMap = (address) => {
        // console.log(inputValue)

        mapRef.geocode(inputValue).then(result => setGeoCodecCoordinates(result.geoObjects.get(0).geometry.getCoordinates()))
        mapRef.geocode(inputValue).then(result => getAddress(result.geoObjects.get(0).geometry.getCoordinates()))


    }
    const getAddress = (a) => {
        console.log(a)
        mapRef.geocode(a).then(result => setAddressText(result.geoObjects.get(0).getAddressLine()))
    }
    // const state = { coordinates: null }
    const geocodeFunc = (ymaps) => {
        console.log(inputValue)
        ymaps.geocode(inputValue)
            .then(result => setGeoCodecCoordinates(result.geoObjects.get(0).geometry.getCoordinates()))
    }
    console.log(geoCodecCoordinates)
    const section1 = () => {
        setChooseSection(1)
    }
    const section2 = () => {
        setChooseSection(2)
    }
    const section3 = () => {
        setChooseSection(3)
    }
    // const masters = (task_id) => {
    //     getRespondMasters(task_id).then(data=>setmasterResponsedData(data))
    //     console.log(task_id)
    //     console.log(masterResponsedData)
    //     setmodalMasters(true)


    // }
    const click = async () => {
        try {
            const formData = new FormData()
            formData.append('usercustomer_id', user.user.id)
            formData.append('name', name)
            formData.append('info', info)
            formData.append('image_task', file)
            formData.append('cost', cost)
            console.log(formData)
            createTask(formData)
            setModalTask(false)
            // let data;
            // data = await becomeMasterfunction(user.user.id, FIO, info, education, file)
            // history(MASTERS_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }


    // console.log(location.pathname)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const onFinish = (value) => {
        let coordstr = newCoords[0] + "," + newCoords[1]

        console.log(value["file"].file)
        const formData = new FormData()
        formData.append('usercustomer_id', user.user.id)
        formData.append('name', value["name"])
        formData.append('info', value["info"])
        formData.append('image_task', file)
        formData.append('cost', value["cost"])
        formData.append('task_date', value["task_date"].format("DD-MM-YYYY"))
        formData.append('place', value["place"])
        formData.append('address', inputValue)
        formData.append('type_service_id', selecttypeservicesdata)
        console.log(selecttypeservicesdata)
        console.log(formData)
        createTask(formData)
        setModalTask(false)
        // setchooseDate(false)
        // let date = value["date"].format("YYYY-MM-DD")
        // let time = value["time"]
        // let datetime = date + " " + time
        // createServiceOrdered(id, user.user.id, serviceId, datetime)
        // console.log(date, time)
    }


    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const handleChange = (value) => {
        setSelectTypeServicesdata(value)
        console.log(`selected ${value}`);
    };
    // const deleteservice = (serviceid) => {
    //     console.log(serviceid)
    //     deleteServiceOrdered(serviceid)


    // }
    return (
        <Container style={{ marginTop: 30 }}>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <Container>
                    <h2>Ваши задания</h2>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}>
                    <Button variant={"outline-dark"} style={{ whiteSpace: 'nowrap', marginBottom: 10, marginRight: 10 }} onClick={() => createTaskButton()}>Создать задание</Button>
                    {user.user.role == "MASTER" ?
                        <Button variant={"outline-dark"} style={{ whiteSpace: 'nowrap', marginBottom: 10 }} onClick={() => history(TASKS_MASTER_ROUTE + "/" + user.user.id)}>Задания для выполнения</Button> : <></>
                    }
                </Container>
            </Container>
            {/* <Container style={{ width: 350, height: 350 }}>
                <MapComponent/>
            </Container> */}

            {chooseSection == 1
                ?
                <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                    <h3 style={{ cursor: 'pointer' }} onClick={() => section1()}>Размещенные задания</h3>
                    <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section2()}>Назначенные задания</h3>
                    <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section3()}>История заказов</h3>
                </Container>
                : chooseSection == 2 ?
                    <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                        <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section1()}>Размещенные задания</h3>
                        <h3 style={{ cursor: 'pointer' }} onClick={() => section2()}>Назначенные задания</h3>
                        <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section3()}>История заказов</h3>
                    </Container>
                    :
                    <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

                        <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section1()}>Размещенные задания</h3>
                        <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => section2()}>Назначенные задания</h3>
                        <h3 style={{ cursor: 'pointer' }} onClick={() => section3()}>История заказов</h3>
                    </Container>
            }
            {chooseSection == 1
                ?
                <TaskCustomer taskData={taskData} />
                : chooseSection == 2 ?
                    <RespondedTaskCustomer taskOrdered={taskOrdered} />
                    :
                    <HistoryTaskCustomer taskHistoryCustomer={taskHistoryCustomer} />
            }
            <Modal

                show={modalTask}

                onHide={() => setModalTask(false)}
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Опишите задание
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    {/* <Form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                        <Form.Control
                            className='mt-3'
                            placeholder='Название задания'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Информация о задании'
                            value={info}
                            onChange={e => setInfo(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            onChange={selectFile}
                            type='file'
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Стоимость'
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </Form> */}
                    <Form onFinish={onFinish} layout="vertical" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 'auto' }}>
                        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>

                            <Container style={{ width: 400, marginLeft: 10 }}>


                                <Form.Item name="name" label="Название" style={{ marginBottom: 3 }}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="info" label="Информация" style={{ marginBottom: 3 }}>
                                    <TextArea style={{ width: '100%', height: 100 }} showCount maxLength={150} />
                                </Form.Item>
                                <Form.Item name="task_date" label="Дата" style={{ marginBottom: 3 }}>
                                    <DatePicker style={{ width: 140, marginBottom: 10 }} placement="bottomRight" placeholder='Выберите дату' getPopupContainer={(triggerNode) => {
                                        return triggerNode.parentNode;
                                    }} />
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
                                <Form.Item name="place" label="Место" style={{ marginBottom: 3 }}>
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="Не важно">Не важно</Radio.Button>
                                        <Radio.Button value="У меня">У меня</Radio.Button>
                                        <Radio.Button value="У мастера">У мастера</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name="cost" label="Стоимость" style={{ marginBottom: 3 }}>
                                    <Input />
                                </Form.Item>
                            </Container>
                            <Container style={{ width: 400, display: 'flex', alignItems: 'start', flexDirection: 'column' }}>

                                <Form.Item name="type" label="Тип услуги" style={{ marginBottom: 3 }}>
                                    
                                        <Select
                                            
                                            style={{
                                                width: 265,
                                            }}
                                            onChange={handleChange}
                                            
                                            getPopupContainer={(triggerNode) => {
                                                return triggerNode.parentNode;
                                            }}

                                            
                                        >
                                            {typeservicesdata.map(item => {
                                                
                                                
                                                return <Option key={item.type_id} value={item.type_id} label={item.type_name}>{item.type_name}</Option>;
                                            })}
                                        </Select>
                                    
                                </Form.Item>
                                <Container style={{ display: 'flex', alignItems: 'end', flexDirection: 'row', paddingLeft: 0 }}>
                                    <Form.Item name="address" label="Введите полный адрес" style={{ marginBottom: 3, width: 350 }}>
                                        <Input onChange={onChange} />
                                    </Form.Item>
                                    <Button style={{ marginLeft: 5, backgroundColor: 'white', color: 'blue' }} onClick={() => changeMap(inputValue)}>Показать</Button>
                                </Container>

                                <Form.Item name="map" label="Карта">

                                    {/* <YMaps onApiAvaliable={ymaps => this.geocode("Тюмень")}>
                                        <Map state={mapState}>
                                            {!this.state.coordinates ? null :

                                                <Placemark geometry={{ coordinates: this.state.coordinates }} />
                                            }

                                        </Map>
                                    </YMaps> */}

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
                                                onLoad={ymaps => setMapRef(ymaps)}
                                            // func={ymaps => geocodeFunc(ymaps)}
                                            >

                                                {/* <Placemark geometry={{ coordinates: state }} /> */}
                                                <Placemark geometry={[geoCodecCoordinates[0], geoCodecCoordinates[1]]}
                                                    options={
                                                        {
                                                            //preset: 'islands#circleIcon', // список темплейтов на сайте яндекса
                                                            //iconColor: 'green', // цвет иконки, можно также задавать в hex
                                                            // balloonContentLayout: this.state.balloonContent

                                                        }}
                                                    properties={
                                                        {
                                                            balloonContentHeader: inputValue,
                                                            balloonContentBody: addressText
                                                            // iconContent: '', // пару символов помещается
                                                            // hintContent: '<b> Я появляюсь при наведении на метку </b>',
                                                            // // создаём пустой элемент с заданными размерами
                                                            //  balloonContent: mapRef.balloonContent

                                                            // Формируем строку с данными об объекте.

                                                            // В качестве контента балуна задаем строку с адресом объекта.
                                                            // balloonContent: mapRef.geocode(inp)
                                                            // .then(result=>result.geoObjects.get(0).getAddressLine())
                                                        }} />

                                            </Map>

                                        </div>
                                    </YMaps>
                                </Form.Item>


                                {/* <Form.Item name="address" label="Адрес">
                            <Input />
                        </Form.Item> */}
                                {/* <Form.Item name="file" label="Фото">
                            <Input type="file" onChange={selectFile}/>
                        </Form.Item> */}

                            </Container>
                        </Container>
                        <Container style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green', borderColor: 'green' }}>
                                Подтвердить
                            </Button>
                        </Container>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button
                        variant={'outline-success'}
                        onClick={click}
                    >
                        Подтвердить
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default TasksCustomerPage
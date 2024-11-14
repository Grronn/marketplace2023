import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row, Spinner, Form } from "react-bootstrap";

import { createOrderedTask, deleteTaskWhenOrdered, getRespondMasters } from '../../http/taskAPI';
import { useParams } from 'react-router-dom';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';


const TaskCustomer = ({ taskData }) => {
    const [masterResponsedData, setmasterResponsedData] = useState([])
    const [modalMasters, setmodalMasters] = useState(false)
    const [modalAddress, setModalAddress] = useState(false)
    const [chooseTaskId, setChooseTaskId] = useState(0)
    const { id } = useParams()
    const [newCoords1, setNewCoords1] = useState(0);
    const [newCoords2, setNewCoords2] = useState(0);
    const [addressStr, setAddressStr] = useState('');
    let arrcoord = []
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([0, 0])
    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 16
    };
    const [addressText, setAddressText] = useState('')
    const [geoObj, setGeoObj] = useState()

    const masters = (task_id) => {
        getRespondMasters(task_id).then(data => setmasterResponsedData(data))
        setChooseTaskId(task_id)
        console.log(task_id)
        console.log(masterResponsedData)
        setmodalMasters(true)


    }

    const address = (address) => {
        // var str = master.coord
        setAddressStr(address)
        console.log(address)
        // mapRef.geocode(address).then(result => console.log(result.geoObjects.get(0).geometry.getCoordinates()))
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
        setModalAddress(true)

    }
    const loadMap = (ymaps) => {

        console.log(addressStr)

        ymaps.geocode(addressStr).then(result => getAddress(ymaps, result.geoObjects.get(0).geometry.getCoordinates()))
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
    const createOrderedTaskFunc = (usermaster_id) => {
        createOrderedTask(usermaster_id, id, chooseTaskId)
        // deleteTaskWhenOrdered(chooseTaskId)
        setmodalMasters(false)


    }

    // console.log(taskData[0])

    return (

        <Container>
            {taskData.length > 0 ?
                taskData.map(task =>
                    <Card className=' my-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 7, alignItems: 'center' }} border='dark'  >

                        <Image width={100} height={100} src={process.env.REACT_APP_API_URL + task.image_task} className='my-2 mx-2 rounded' />

                        <Container style={{ display: 'flex', flexDirection: "row" }}>
                            <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Название: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.name}</span>
                                    </div>
                                </Container>
                                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Тип услуги: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400, border: '1px solid', 'border-radius': "20px", paddingLeft: 5, paddingRight: 5, height: 30, whiteSpace: 'nowrap' }}>{task.type_name}</span>
                                    </div>
                                    {/* <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.type_name}</span>
                                    </div> */}
                                </Container>
                                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Стоимость: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.cost}</span>
                                    </div>
                                </Container>
                                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Информация: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.info_task}</span>
                                    </div>
                                </Container>

                            </Container>
                            <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Место: </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.place}</span>
                                    </div>
                                </Container>
                                {task.place == "У меня" ?
                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>

                                        <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Адрес: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }} onClick={() => address(task.address)}>
                                            <span style={{ fontSize: 20, fontWeight: 400, color: "blue", cursor: 'pointer' }} >Просмотреть адрес</span>
                                        </div>


                                    </Container>

                                    :
                                    <>
                                    </>
                                }
                                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                        <span style={{ fontSize: 24, fontWeight: 500 }}>Крайний срок(включительно): </span>
                                    </div>
                                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                                        <span style={{ fontSize: 20, fontWeight: 400 }}>{task.task_date}</span>
                                    </div>
                                </Container>

                            </Container>
                        </Container>


                        {/* <Container style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                            <span style={{ fontSize: 24, fontWeight: 500 }}>Информация: </span>
                        </div>
                        <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10, lineHeight: 1 }}>
                            <span style={{ fontSize: 20, fontWeight: 400 }}>{task.info_task}</span>
                        </div>
                    </Container> */}
                        <Container style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>
                            <Button style={{ backgroundColor: "#47A76A", borderColor: "#47A76A", height: 50, lineHeight: 1, width: 130, fontSize: 16, marginBottom: 10 }} onClick={() => masters(task.task_id)}>Выбрать мастера</Button>
                            <Button style={{ backgroundColor: 'white', borderColor: 'blue', color: 'blue', height: 30, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 16, fontWeight: 400, marginRight: 5, width: 130, marginBottom: 10 }}>Изменить</Button>
                            <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 30, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 16, fontWeight: 400, width: 130 }}>Удалить</Button>
                        </Container>


                    </Card>

                )
                :
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: window.innerHeight - 214 }} >
                    <h3>Пусто</h3>
                </Container>
            }

            <Modal
                className='my-2'
                show={modalMasters}
                size="lg"
                onHide={() => setmodalMasters(false)}
                centered

            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Мастера которые откликнулись
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: 'auto' }}>
                    {masterResponsedData.length > 0 ?
                        masterResponsedData.map(master =>
                            <Card className=' my-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 7, alignItems: 'center', width: 700 }} border='dark'  >
                                <Image width={100} height={100} src={process.env.REACT_APP_API_URL + master.image_master} className='my-2 mx-2 rounded' />
                                <Container>
                                    <Container className='d-flex flex-row'>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Мастер: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.fio}</span>
                                        </div>
                                    </Container>
                                    <Container className='d-flex flex-row'>
                                        <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                                            <span style={{ fontSize: 24, fontWeight: 500 }}>Информация: </span>
                                        </div>
                                        <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                                            <span style={{ fontSize: 20, fontWeight: 400 }}>{master.info}</span>
                                        </div>
                                    </Container>

                                </Container>

                                <Button style={{ backgroundColor: "#47A76A", borderColor: "#47A76A", height: 50 }} onClick={() => createOrderedTaskFunc(master.id)}>Выбрать</Button>

                            </Card>

                        ) :

                        <h3>Пусто</h3>

                    }

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
                                            balloonContentHeader: addressStr,
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


                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default TaskCustomer
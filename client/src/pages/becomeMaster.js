import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Modal from "react-bootstrap/Modal";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { set } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { MASTERS_ROUTE } from '../utils/consts';
import jwt_decode from "jwt-decode";
import { becomeMasterfunction, fetchMaster } from '../http/masterAPI';
import { addTypesUserServices, fetchTypeServices } from '../http/typeServicesAPI';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';


const becomeMaster = observer(() => {
    useEffect(() => {
        fetchTypeServices().then(data => typeServices.setTypeServices(data))
    }, [])
    const { user } = useContext(Context)
    const { typeServices } = useContext(Context)
    const [FIO, setFIO] = useState('')
    const [info, setInfo] = useState('')
    const [education, setEducation] = useState('')
    const [file, setFile] = useState(null)
    const [chooseTypes, setchooseTypese] = useState(false)
    const [arraycheckusestate, setArrayc] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [addressText, setAddressText] = useState('')
    const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([0, 0])
    const [mapRef, setMapRef] = useState()
    const mapState = {
        center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
        zoom: 16
    };
    const [newCoords, setNewCoords] = useState([
        0, 0
    ]);
    let arraycheckbox = [];
    const add_checked = (el) => {
        arraycheckbox.indexOf(el) === -1 ? arraycheckbox.push(el) : console.log("было " + el)
        // arraycheckbox.push(el);
    }
    const func = () => {
        setchooseTypese(false)
        setArrayc(arraycheckbox)

    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    // console.log(typeServices.typeServices)
    // console.log(arraycheckusestate)

    const changeMap = (address) => {
        // console.log(inputValue)
        // setInputValue(address)
        mapRef.geocode(inputValue).then(result => setGeoCodecCoordinates(result.geoObjects.get(0).geometry.getCoordinates()))
        mapRef.geocode(inputValue).then(result => getAddress(result.geoObjects.get(0).geometry.getCoordinates()))


    }
    const getAddress = (a) => {
        console.log(a)
        mapRef.geocode(a).then(result => setAddressText(result.geoObjects.get(0).getAddressLine()))
    }
    const history = useNavigate()
    // const onChange = (addressinp) => {
    //     // console.log(event.target.value)

    //     setInputValue(addressinp)


    // }
    const click = async () => {
        try {
            let coordstr = newCoords[0] + "," + newCoords[1]
            const formData = new FormData()
            formData.append('id', user.user.id)
            formData.append('FIO', FIO)
            formData.append('info', info)
            formData.append('education', education)
            formData.append('image_master', file)
            formData.append('address', inputValue)
            for (let i = 0; i < arraycheckusestate.length; i++) {
                addTypesUserServices(user.user.id, arraycheckusestate[i])
            }


            becomeMasterfunction(user.user.id, formData).then(data => history(MASTERS_ROUTE))

            // let data;
            // data = await becomeMasterfunction(user.user.id, FIO, info, education, file)
            // history(MASTERS_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 900, display:'flex',justifyContent:'center' }} className='p-5'>
                <h2 className='m-auto'>Заполните данные</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ФИО'
                        value={FIO}
                        onChange={e => setFIO(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Информация о вас'
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Образование'
                        value={education}
                        onChange={e => setEducation(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        onChange={selectFile}
                        type='file'
                    />
                    <Button
                        variant={'outline-success'}
                        onClick={() => setchooseTypese(true)}
                        className='mt-3'
                    >
                        Какие услуги вы предоставляете?
                    </Button>
                    <Container style={{ display: 'flex', alignItems: 'end', flexDirection: 'row', paddingLeft: 0 }}>
                        <Form.Control
                            className='mt-3'
                            placeholder='Полный адрес'
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <Button style={{ marginLeft: 5, backgroundColor: 'white', color: 'blue' }} onClick={() => changeMap(inputValue)}>Показать</Button>
                    </Container>
                    <Container style={{ display: 'flex', justifyContent:'center', marginTop:10 }}>
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
                    </Container>
                    
                    {/* <YMaps>
                        <div style={{ width: 350, height: 350, marginLeft:'auto', marginRight:'auto', marginTop: 10 }}>
                            <Map style={{ width: 350, height: 350 }} defaultState={{ center: [57.15447690280325,65.5381877031135], zoom: 16 }}
                                onClick={(event) => {
                                    const coords = event.get("coords");
                                    setNewCoords(() => coords);
                                }}>

                                <Placemark geometry={[newCoords[0], newCoords[1]]} />

                            </Map>

                        </div>
                    </YMaps> */}
                    <Modal
                        className='my-2'
                        show={chooseTypes}
                        onHide={() => setchooseTypese(false)}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Выберите виды услуг
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ height: 100, display: 'flex', 'flex-wrap': 'wrap' }}>
                            {typeServices.typeServices.map(type =>
                                <div style={{ "margin-left": 10 }}>
                                    <input

                                        class="form-check-input"
                                        type="checkbox"
                                        value={type.name}
                                        id={type.type_id}
                                        onClick={() => add_checked(type.type_id)}
                                    />
                                    <label style={{ "margin-left": 5 }} for={type.type_id}>{type.name}</label>
                                </div>

                                // <MasterItem key={master.id} master={master} />
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-success" onClick={() => func()}>Добавить</Button>
                        </Modal.Footer>
                    </Modal>
                    <Container className="d-flex justify-content-between mt-3 px-0">

                        <div>
                            <NavLink to={MASTERS_ROUTE}>Назад</NavLink>
                        </div>

                        <Button
                            variant={'outline-success'}
                            onClick={click}
                        >
                            Подтвердить
                        </Button>
                    </Container>
                </Form>
            </Card>

        </Container>
    )
})

export default becomeMaster
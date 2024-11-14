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
import { addTypesUserServices, fetchTypeServices, getTypesUserServices } from '../http/typeServicesAPI';
import { createService } from '../http/serviceAPI';

const CreateService = observer(() => {
    const { user } = useContext(Context)
    const { typeServices } = useContext(Context)
    const [type_service_id, setType_service_id] = useState('')
    const [name, setName] = useState('')
    const [info, setInfo] = useState('')
    const [cost, setCost] = useState('')
    const [service_image, setService_image] = useState(null)
    const [chooseTypes, setchooseTypese] = useState(false)
    const [typesid, setTypesid] = useState([])
    useEffect(() => {
        fetchTypeServices().then(data => typeServices.setTypeServices(data))
        getTypesUserServices(user.user.id).then(data => setTypesid(data))
    }, [])
    
    const selectFile = e => {
        setService_image(e.target.files[0])
    }
    const func = () => {
        setchooseTypese(false)
        console.log(type_service_id)
    }
    const history = useNavigate()

    const click = async () => {
        try {
            const formData = new FormData()
            formData.append('user_id', user.user.id)
            formData.append('type_service_id', type_service_id)
            formData.append('name', name)
            formData.append('info', info)
            formData.append('cost', cost)
            formData.append('service_image', service_image)



            createService(formData).then(data => history(MASTERS_ROUTE))

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
            <Card style={{ width: 900 }} className='p-5'>
                <h2 className='m-auto'>Добавление услуги</h2>
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
                    <Button
                        variant={'outline-success'}
                        onClick={() => setchooseTypese(true)}
                        className='mt-3'
                    >
                        Тип услуги
                    </Button>

                    <Modal
                        className='my-2'
                        show={chooseTypes}
                        onHide={() => setchooseTypese(false)}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Выберите тип услуги
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ height: 100, display: 'flex', 'flex-wrap': 'wrap' }}>
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

export default CreateService
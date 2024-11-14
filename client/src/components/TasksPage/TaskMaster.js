import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'

import { Context } from '../../index';
import { DatePicker } from 'antd/lib';
import { Form, Radio } from 'antd';
import { respondTask } from '../../http/taskAPI';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';


const TaskMaster = ({taskData}) => {
    const { id } = useParams()
    const [modalAddress, setModalAddress] = useState(false)
    const [newCoords1, setNewCoords1] = useState(0);
    const [newCoords2, setNewCoords2] = useState(0);

    let arrcoord = []




    

    const address = (address) => {
        // var str = master.coord

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

    const respond = (task_id,usercustomer_id) => {
        respondTask(task_id,id,usercustomer_id)
    
    
      }
    return (

        <Container>
            {taskData.length > 0?
            taskData.map(task =>
                <Card className=' my-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", padding: 7,alignItems:'center' }} border='dark'  >
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
                                    <div style={{ display: 'flex', 'align-items': 'flex-end'}}>
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
                    <Button style={{ backgroundColor: "#47A76A", borderColor: "#47A76A",height:50 }} onClick={() => respond(task.task_id,task.usercustomer_id)}>Откликнуться</Button>

                </Card>

            )
            :
            <Container style={{ display: 'flex', justifyContent:'center', alignItems:'center', height: window.innerHeight - 214 }} >
                <h3>Пусто</h3>
            </Container>
            }
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

export default TaskMaster
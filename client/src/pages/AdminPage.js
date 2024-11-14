import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Context } from '../index';
import { Form } from 'antd';
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, LineController, BarElement, BarController, Legend } from "chart.js";
import { fetchMaster } from '../http/masterAPI';
import { getServicesAll, getServicesMaster } from '../http/serviceAPI';
import { fetchTypeServices } from '../http/typeServicesAPI';
import { getAllTask } from '../http/taskAPI';

Chart.register(CategoryScale, LinearScale, LineController, BarElement, BarController, Legend);
const AdminPage = () => {
    const { user } = useContext(Context)
    const { master } = useContext(Context)
    const { typeServices } = useContext(Context)
    const [modalStats, setModalStats] = useState(false)
    const [servicesdata, setServicesdata] = useState([])
    const [typeservicesdata, setTypeServicesdata] = useState([])
    const [tasksdata, setTasksData] = useState([])
    const barChartData = {
        labels: ["Июнь"],
        datasets: [
            {
                data: [30],
                label: "Маникюр",
                borderColor: "#3333ff",
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                fill: true
            },
            {
                data: [25],
                label: "Ресницы",
                borderColor: "#ff3333",
                backgroundColor: "rgba(58, 55, 212, 1)",
                fill: true
            },
            {
                data: [20],
                label: "Брови",
                borderColor: "#ff3333",
                backgroundColor: "rgba(63, 183, 196, 1)",
                fill: true
            }
            ,
            {
                data: [28],
                label: "Парикмахерские услуги",
                borderColor: "#ff3333",
                backgroundColor: "rgba(39, 145, 41, 1)",
                fill: true
            }
            ,
            {
                data: [15],
                label: "Массаж",
                borderColor: "#ff3333",
                backgroundColor: "rgba(189, 204, 51, 1)",
                fill: true
            }
        ]
    };
    useEffect(() => {
        fetchMaster(typeServices.selectedType.type_id, user.user.id).then(data => master.setMasters(data))
        getServicesAll().then(data => setServicesdata(data))
        fetchTypeServices().then(data => setTypeServicesdata(data))
        getAllTask().then(data => setTasksData(data))
    }, [])
    const showStats = () => {
        setModalStats(true)
    }
    const Services = (id) => {
        const [servicesdata, setServicesdata] = useState([])
        getServicesMaster(id).then(data => setServicesdata(data))
        return servicesdata
    }
    const onFinish = (value) => {
        try {

        }
        catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Container style={{ display: 'flex', flexDirection: 'row', paddingTop: 30 }}>
                <Container>
                    <h2>Админ панель</h2>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}>
                    <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap' }} >Добавить вид услуг</Button>

                    {/* <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap', marginLeft: 10, marginRight: 10 }} onClick={() => showStats()}>Статистика</Button> */}

                    {/* <Button variant={"outline-dark"} style={{ marginBottom: 10, whiteSpace: 'nowrap' }} >Изменить информацию</Button> */}
                </Container>
            </Container>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>


                <Container style={{ display: 'flex', width: 500, justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 30, flexDirection: 'column', overflowY: 'scroll', height: 700, marginRight: 30 }}>
                    {master.masters.map(master =>
                        <Container style={{ display: 'flex', justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 5, marginBottom: 5, flexDirection: 'column' }}>
                            <Container style={{ padding: 0, display: 'flex', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                                <span style={{ fontSize: 16, fontWeight: 500 }}>{master.fio}</span>
                                <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 14, fontWeight: 400 }}>Удалить</Button>
                            </Container>

                            {servicesdata.filter(service => service.user_id === master.id).map(service =>
                                <Container style={{ borderTop: '1px solid #C0C0C0', display: 'flex', justifyContent: 'space-between', height: 30, alignItems: 'center', paddingRight: 0 }}>
                                    <span style={{ fontSize: 15, fontWeight: 400 }}>{service.service_name}</span>
                                    <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 14, fontWeight: 400 }}>Удалить</Button>
                                </Container>
                            )
                        /* {Services(master.id).map(service=>
                            <Container>
                                {service.service_name}
                            </Container>
                        )} */}
                        </Container>
                    )}
                </Container>
                <Container style={{ display: 'flex', width: 500, justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 30, flexDirection: 'column', overflowY: 'scroll', height: 700, marginRight: 30 }}>
                    {tasksdata.map(task =>
                        <Container style={{ display: 'flex', justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 5, marginBottom: 5, flexDirection: 'column' }}>
                            <Container style={{ padding: 0, display: 'flex', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                                <span style={{ fontSize: 16, fontWeight: 500 }}>{task.name}</span>


                                <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 14, fontWeight: 400 }}>Удалить</Button>


                            </Container>


                        </Container>
                    )}
                </Container>
                <Container style={{ display: 'flex', width: 550, justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 30, flexDirection: 'column', overflowY: 'scroll', height: 700 }}>
                    {typeservicesdata.map(typeservice =>
                        <Container style={{ display: 'flex', justifyContent: 'start', border: '1px solid', 'border-radius': "10px", marginTop: 5, marginBottom: 5, flexDirection: 'column' }}>
                            <Container style={{ padding: 0, display: 'flex', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                                <span style={{ fontSize: 16, fontWeight: 500 }}>{typeservice.type_name}</span>
                                <Container style={{ width: 'auto', margin: 0 }}>
                                    <Button style={{ backgroundColor: 'white', borderColor: 'blue', color: 'blue', height: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 14, fontWeight: 400, marginRight: 5 }}>Изменить</Button>
                                    <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 20, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 14, fontWeight: 400 }}>Удалить</Button>
                                </Container>

                            </Container>


                        </Container>
                    )}
                </Container>
            </Container>
            <Modal
                show={modalStats}
                onHide={() => setModalStats(false)}
                centered
                layout="vertical"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Статистика
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Bar
                        type="bar"
                        width={130}
                        height={50}
                        options={{
                            title: {
                                display: true,
                                text: "Количество заказов по виду услуги",
                                fontSize: 15
                            },
                            legend: {
                                display: true, //Is the legend shown?
                                position: "top" //Position of the legend.
                            }
                        }}
                        data={barChartData}
                    />
                    {/* <Form onFinish={onFinish} layout="vertical" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 'auto' }}>

                    </Form> */}
                </Modal.Body>
                <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>

                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default AdminPage
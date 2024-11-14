import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, deleteServiceOrdered, getServiceOrderedCustomer, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { HISTORY_SERVICE_ORDERED, ORDERED_SERVICES_CUSTOMER_ROUTE, TASKS_CUSTOMER_ROUTE } from '../utils/consts';
import { getAllTask, getHistoryTaskMaster, getTaskOrderedMaster, respondTask } from '../http/taskAPI';
import TaskMaster from '../components/TasksPage/TaskMaster';
import RespondedTaskMaster from '../components/TasksPage/RespondedTaskMaster';
import HistoryTaskMaster from '../components/TasksPage/HistoryTaskMaster';

const TaskMasterPage = () => {
    const { user } = useContext(Context)
    const [servicesdata, setServicesdata] = useState([])
    // const [master, setMaster] = useState({})
    const [taskData, setTaskData] = useState([])
    const [taskOrderedMaster, setTaskOrderedMaster] = useState([])
    const [taskHistoryMaster, setTaskHistoryMaster] = useState([])
    const { id } = useParams()
    const history = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [chooseSection, setChooseSection] = useState(1)
    useEffect(() => {


        getServiceOrderedCustomer(id).then(data => setServicesdata(data)).finally(() => setLoading(false))
        getAllTask(id).then(data => setTaskData(data))
        getTaskOrderedMaster(id).then(data => setTaskOrderedMaster(data))
        getHistoryTaskMaster(id).then(data => setTaskHistoryMaster(data))
        // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

    }, [])
    if (loading) {
        return <Spinner animation={"grow"} />
    }
    const section1 = () => {
        setChooseSection(1)
    }
    const section2 = () => {
        setChooseSection(2)
    }
    const section3 = () => {
        setChooseSection(3)
    }
    console.log(location.pathname)
    console.log("Customer")
    console.log(servicesdata)
    const deleteservice = (serviceid) => {
        console.log(serviceid)
        deleteServiceOrdered(serviceid)


    }
    // const respond = (task_id) => {
    //     respondTask(task_id,id)


    //   }
    return (
        <Container style={{ marginTop: 30 }}>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <Container>
                    <h2>Задания для выполнения</h2>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>


                    <Button variant={"outline-dark"} style={{ whiteSpace:'nowrap', marginBottom: 10 }} onClick={() => history(TASKS_CUSTOMER_ROUTE + "/" + user.user.id)}>Ваши задания</Button>


                </Container>
            </Container>
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
                <TaskMaster taskData={taskData} />
                : chooseSection == 2 ?
                    <RespondedTaskMaster taskOrderedMaster={taskOrderedMaster}/>
                    :
                    <HistoryTaskMaster taskHistoryMaster={taskHistoryMaster}/>
            }
            
        </Container>
        
    )
}

export default TaskMasterPage
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, doServiceOrdered, getServiceOrderedMaster, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { HISTORY_SERVICE_ORDERED_MASTER, ORDERED_SERVICES_CUSTOMER_ROUTE, ORDERED_SERVICES_MASTER_ROUTE } from '../utils/consts';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';

const OrderedServices = () => {
  const { user } = useContext(Context)
  const [servicesdata, setServicesdata] = useState([])
  const { id } = useParams()
  const [newCoords1, setNewCoords1] = useState(0);
  const [newCoords2, setNewCoords2] = useState(0);

  let arrcoord = []

  const [modalAddress, setModalAddress] = useState(false)
  const history = useNavigate()
  useEffect(() => {


    getServiceOrderedMaster(id).then(data => setServicesdata(data))

    // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

  }, [])
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
  const doservice = (service_ordered_id) => {
    console.log(service_ordered_id)
    doServiceOrdered(service_ordered_id)


  }
  console.log("Master")
  console.log(servicesdata)
  return (
    <Container style={{ marginTop: 30 }}>

      <Container style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <h2>У меня заказали</h2>
        </Container>
        <Container style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>

          {user.user.role == "MASTER" ?
            <Button variant={"outline-dark"} style={{ whiteSpace: 'nowrap', marginBottom: 10 }} onClick={() => history(ORDERED_SERVICES_CUSTOMER_ROUTE + "/" + user.user.id)}>Я заказал</Button> : <></>
          }
        </Container>
      </Container>



      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>

        <h3 style={{ cursor: 'pointer' }} onClick={() => history(ORDERED_SERVICES_MASTER_ROUTE + "/" + user.user.id)}>Услуги для выполнения</h3>
        <h3 style={{ cursor: 'pointer', color: '#C0C0C0' }} onClick={() => history(HISTORY_SERVICE_ORDERED_MASTER + "/" + user.user.id)}>История заказов</h3>
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
            <span style={{ fontSize: 22, fontWeight: 500 }}>Заказчик </span>

            <Container style={{ display: 'flex', flexDirection: "row", borderTop: '1px solid #C0C0C0' }}>
              <Image width={100} height={100} src={process.env.REACT_APP_API_URL + service.image_master} className='my-2 mx-2 rounded' />
              <Container style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                  <Container style={{ display: 'flex', flexDirection: 'row' }}>

                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                      <span style={{ fontSize: 24, fontWeight: 500 }}>{service.fio}</span>
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
            <Button style={{ backgroundColor: "#6495ED", borderColor: "#6495ED" }} onClick={() => doservice(service.service_ordered_id)}>Отметить выполнение</Button>

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
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Заказчик: </span>
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
                
                <Button style={{ backgroundColor: "#6495ED", borderColor: "#6495ED" }} onClick={() => doservice(service.service_ordered_id)}>Отметить выполнение</Button>
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

    </Container>
  )
}

export default OrderedServices
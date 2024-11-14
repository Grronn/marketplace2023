import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { DatePicker } from 'antd/lib';
import { Form, Radio } from 'antd';

const Reviews = ({ reviewsData }) => {
  const [master, setMaster] = useState({})
  const { user } = useContext(Context)
  const [typesid, setTypesid] = useState([])

  const [chooseDate, setchooseDate] = useState(false)
  const [serviceId, setServiceId] = useState()
  const [serviceDate, setServiceDate] = useState()
  const [serviceTime, setServiceTime] = useState()
  const arr = new Array();
  const [typesname, setTypesname] = useState([])

  const { id } = useParams()
  useEffect(() => {
    fetchOneMaster(id).then(data => setMaster(data))
    getTypesUserServices(id).then(data => setTypesid(data))
    console.log(reviewsData)


    // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

  }, [])

  // getTypesUserServicesname(typesid[0].type_service_id).then(data => setTypesname([...typesname, data]))


  // console.log(typesid)
  console.log(1)
  console.log(reviewsData)

  const order = (serviceid) => {
    setServiceId(serviceid)
    setchooseDate(true)


  }

  const onFinish = (value) => {
    setchooseDate(false)
    let date = value["date"].format("YYYY-MM-DD")
    let time = value["time"]
    let datetime = date + " " + time
    createServiceOrdered(id, user.user.id, serviceId, datetime)
    console.log(date, time)
  }
  return (

    <Container style={{ /*border: '1px solid', 'border-radius': "10px",*/justifyContent: 'center' }} border='dark' className='d-flex flex-column mt-5 w-100' >

      <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {reviewsData.map(review =>
          <Card className='d-flex flex-row my-3 w-500' style={{ width: 750, /*cursor: "pointer",*/ justifyContent: "space-between" }} border='dark'  >
            <Container style={{ display: 'flex', flexDirection: "column" }}>
              <Container style={{ display: 'flex', flexDirection: "row" }}>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'center' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Клиент: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.fio}</span>
                  </div>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'center' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Оценка: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.rate}</span>
                  </div>
                </Container>
              </Container>
              <Container style={{ display: 'flex', flexDirection: "row" }}>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'center' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Услуга: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.service_name}</span>
                  </div>
                </Container>

              </Container>
              <Container style={{ display: 'flex', flexDirection: "row" }}>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Отзыв: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-start', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.text_review}</span>
                  </div>
                </Container>

              </Container>
            </Container>

            {/* <Container style={{ display: 'flex', flexDirection: "row" }}>
              <Container style={{ display: 'flex', flexDirection: "column", alignItems: "end" }}>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Клиент: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.fio}</span>
                  </div>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Услуга: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.service_name}</span>
                  </div>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Отзыв: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.text_review}</span>
                  </div>
                </Container>

              </Container>
              <Container style={{ display: 'flex', flexDirection: "column", alignItems: "start" }}>



                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Дата и время: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.service_date}</span>
                  </div>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                    <span style={{ fontSize: 24, fontWeight: 500 }}>Оценка: </span>
                  </div>
                  <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                    <span style={{ fontSize: 20, fontWeight: 400 }}>{review.rate}</span>
                  </div>
                </Container>
              </Container>
            </Container> */}
            {/* <Container>
              <Container className='d-flex flex-row'>
                <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Клиент: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{review.fio}</span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', marginLeft: 50 }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Услуга: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{review.service_name}</span>
                </div>
              </Container>
              <Container className='d-flex flex-row'>

                <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Оценка: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{review.rate}</span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Дата и время: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{review.service_date}</span>
                </div>
              </Container>
              <Container className='d-flex flex-row'>
                <div style={{ display: 'flex', 'align-items': 'start' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Отзыв: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'start', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{review.text_review}</span>
                </div>

              </Container>
            </Container> */}

          </Card>

        )}

      </Container>

      {/* <Container className='d-flex flex-row mt-3'>

          {servicesdata.map(service =>
            <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
              <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_name}</span>
            </div>
          )}

        </Container> */}
    </Container>

  )
}

export default Reviews
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { DatePicker } from 'antd/lib';
import { Form, Radio, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getTimesheet } from '../http/userAPI';



const Services = ({ servicesdata }) => {
  const [master, setMaster] = useState({})
  const { user } = useContext(Context)
  const [typesid, setTypesid] = useState([])
  const [timesheet, setTimesheet] = useState([])
  const [chooseDate, setchooseDate] = useState(false)
  const [serviceId, setServiceId] = useState()
  // const [serviceDate, setServiceDate] = useState()
  // const [serviceTime, setServiceTime] = useState()
  const arr = new Array();
  const [typesname, setTypesname] = useState()

  const { id } = useParams()


  useEffect(() => {
    fetchOneMaster(id).then(data => setMaster(data))
    getTypesUserServices(id).then(data => setTypesid(data))



    // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

  }, [])

  // getTypesUserServicesname(typesid[0].type_service_id).then(data => setTypesname([...typesname, data]))


  // console.log(typesid)

  // console.log(typesid)


  const changeDate = (date) => {
    console.log(id)
    const d = date.format("DD-MM-YYYY")
    console.log(d)
    getTimesheet(id, d).then(data => setTimesheet(data))
    // getTimesheet(id,date.format("DD-MM-YYYY")).then(data=>setTimesheet(data))



  }

  const order = (serviceid) => {
    setServiceId(serviceid)
    setchooseDate(true)


  }

  const onFinish = (value) => {
    setchooseDate(false)
    let date = value["date"].format("DD-MM-YYYY")
    let time = value["time"]
    let datetime = date + " " + time
    createServiceOrdered(id, user.user.id, serviceId, datetime)
    // const a=id
    // const b = value["date"].format("DD-MM-YYYY")
    // console.log(a)
    // console.log(b)
    // getTimesheet(id,value["date"].format("DD-MM-YYYY")).then(data=>console.log(data))
    // console.log(timesheet)
    // console.log(date, time)
  }


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (

    <Container style={{ /*border: '1px solid', 'border-radius': "10px",*/justifyContent: 'center' }} border='dark' className='d-flex flex-column mt-5 w-100' >

      <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {servicesdata.map(service =>
          <Card className='d-flex flex-row my-3 w-500' style={{ width: 700, /*cursor: "pointer",*/ justifyContent: "space-between", alignItems: 'center' }} border='dark'  >
            <Image width={100} height={100} src={process.env.REACT_APP_API_URL + service.service_image} className='my-2 mx-2 rounded' />
            <Container >
              <Container className='d-flex flex-row' style={{ lineHeight: 1, paddingTop: 10 }}>
                <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Тип услуги: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400, border: '1px solid', 'border-radius': "20px", paddingLeft: 5, paddingRight: 5, height: 25, whiteSpace: 'nowrap' }}>{service.type_name}</span>
                </div>
              </Container>
              <Container className='d-flex flex-row' style={{ lineHeight: 1, paddingTop: 10 }}>
                <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Название: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{service.service_name}</span>
                </div>
              </Container>
              <Container className='d-flex flex-row' style={{ lineHeight: 1, paddingTop: 10 }}>
                <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Информация: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{service.info}</span>
                </div>
              </Container>
              <Container className='d-flex flex-row' style={{ lineHeight: 1, paddingTop: 10, paddingBottom: 10 }}>
                <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                  <span style={{ fontSize: 24, fontWeight: 500 }}>Стоимость: </span>
                </div>
                <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 400 }}>{service.cost}</span>
                </div>
              </Container>

            </Container>
            <Container style={{ display: 'flex', 'align-items': 'center', justifyContent: "center", width: 110 }}>

              {user.isAuth && user.user.id != id ?
                <Button style={{ width: 90, height: 40 }}
                  onClick={() => order(service.id)}
                >

                  Заказать
                </Button>
                :
                <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Button style={{ backgroundColor: 'white', borderColor: 'blue', color: 'blue', height: 30, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 16, fontWeight: 400, marginBottom:10, width:90 }}>Изменить</Button>
                  <Button style={{ backgroundColor: 'white', borderColor: 'red', color: 'red', height: 30, paddingLeft: 5, paddingRight: 5, paddingTop: 0, paddingBottom: 0, fontSize: 16, fontWeight: 400, width:90 }}>Удалить</Button>
                </Container>

              }
            </Container>

          </Card>

        )}
        <Modal
          className='my-2'
          show={chooseDate}

          onHide={() => setchooseDate(false)}
          centered

        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Выберите время
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

            <Form onFinish={onFinish} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Form.Item name="date">
                <DatePicker format={"DD-MM-YYYY"} onChange={(date) => changeDate(date)} style={{ width: 140, marginBottom: 10 }} placement="bottomRight" placeholder='Выберите дату' getPopupContainer={(triggerNode) => {
                  return triggerNode.parentNode;
                }} />
              </Form.Item>
              <Form.Item name="time">
                <Radio.Group buttonStyle="solid">
                  {timesheet.map(onetimesheet =>

                    <Radio.Button id={onetimesheet.time} value={onetimesheet.time}>{onetimesheet.time}</Radio.Button>
                  )}
                  {/* <Radio.Button value="13:00">13:00</Radio.Button>
                  <Radio.Button value="14:00">14:00</Radio.Button>
                  <Radio.Button value="15:00">15:00</Radio.Button>
                  <Radio.Button value="16:00">16:00</Radio.Button> */}
                </Radio.Group>
              </Form.Item>
              <Container style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Подтвердить
                </Button>
              </Container>

            </Form>






          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
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

export default Services
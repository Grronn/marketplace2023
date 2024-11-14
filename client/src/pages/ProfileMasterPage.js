import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneMaster } from '../http/masterAPI';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { createServiceOrdered, getServicesMaster } from '../http/serviceAPI';
import { Context } from '../index';
import { DatePicker } from 'antd/lib';
import { Form, Radio } from 'antd';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import { getReview } from '../http/reviewAPI';
import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';
// import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";
// import loadYmap from "../test";
// import * as ymaps3 from 'ymaps3';

// ymaps3.ready.then(() => {
//   const {YMaps} = ymaps3;
//   new YMaps({});
// });

const ProfileMasterPage = () => {
  const [master, setMaster] = useState({})
  const { user } = useContext(Context)
  const [typesid, setTypesid] = useState([])
  const [servicesdata, setServicesdata] = useState([])
  const [reviewsData, setReviewsData] = useState([])
  const [chooseDate, setchooseDate] = useState(false)
  const [showReviews, setshowReviews] = useState(false)
  const [serviceId, setServiceId] = useState()
  const [serviceDate, setServiceDate] = useState()
  const [serviceTime, setServiceTime] = useState()
  const arr = new Array();
  const [typesname, setTypesname] = useState([])

  // const coordins = new Array();
  const { id } = useParams()
  const [newCoords, setNewCoords] = useState([
    57.10866091324924, 65.58472962323376
  ])
  const [addressStr, setAddressStr] = useState('');
  // let arrcoord = []
  const [geoCodecCoordinates, setGeoCodecCoordinates] = useState([0, 0])
  const mapState = {
    center: [geoCodecCoordinates[0], geoCodecCoordinates[1]],
    zoom: 16
  }
  const [addressText, setAddressText] = useState('')
  // const state = { coordinates: null };

  // const geocode = (ymaps) => {
  //   ymaps.geocode('Мытищи')
  //     .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
  // }

  var str = master.coord
  let arrcoord = ""
  if (str !== undefined) {
    arrcoord = str.split(',')
    console.log(arrcoord)
  } else {
    console.log('The variable has an undefined value')
  }
  // console.log(typeof str)
  // var arrcoord = str.split(',')
  // console.log(arrcoord)
  useEffect(() => {
    fetchOneMaster(id).then(data => setMaster(data))
    getTypesUserServices(id).then(data => setTypesid(data))
    getServicesMaster(id).then(data => setServicesdata(data))
    getReview(id).then(data => setReviewsData(data))

    // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

  }, [])



  // coordins = str.split(",");
  // console.log(coordins)
  // getTypesUserServicesname(typesid[0].type_service_id).then(data => setTypesname([...typesname, data]))

  // function init(){

  //   let map=new loadYmap.ymaps.Map('map',{
  //     center:[57.10869267858511,65.58481876923126],
  //     zoom:17
  //   })

  // }
  // loadYmap.yandexMap.ready(init)

  // let map;
  // funcMap();
  // async function funcMap() {
  //   // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
  //   await loadYmap.ymaps3.ready;

  //   // Создание карты
  //   map = new loadYmap.ymaps3.YMap(document.getElementById('map-test'), {
  //     location: {
  //       // Координаты центра карты
  //       // Порядок по умолчанию: «долгота, широта»
  //       center: [55.205247, 25.077816],

  //       // Уровень масштабирования
  //       // Допустимые значения: от 0 (весь мир) до 21.
  //       zoom: 10
  //     }
  //   });

  //   // Добавляем слой для отображения схематической карты
  //   map.addChild(new loadYmap.ymaps3.YMapDefaultSchemeLayer());
  // }



  // console.log(typesid)

  console.log(typesid)

  const order = (serviceid) => {
    setServiceId(serviceid)
    setchooseDate(true)


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
    // setModalAddress(true)

  }
  const loadMap = (ymaps) => {

    setAddressStr(master.address)
    console.log(master.address)
    ymaps.geocode(master.address).then(result => getAddress(ymaps, result.geoObjects.get(0).geometry.getCoordinates()))
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
  const onFinish = (value) => {
    setchooseDate(false)
    let date = value["date"].format("YYYY-MM-DD")
    let time = value["time"]
    let datetime = date + " " + time
    createServiceOrdered(id, user.user.id, serviceId, datetime)
    console.log(date, time)
  }
  const show = (a) => {
    setshowReviews(a)
  }


  // for(let i=0; i<arr.length;i++){
  //   console.log(arr[i])
  // }

  return (
    <Container className="d-flex justify-content-center p-auto" style={{ flexDirection: 'column' }}>


      <Container style={{ /*border: '1px solid', 'border-radius': "10px"*/ }} border='dark' className='d-flex flex-row mt-5 w-100' >
        <Image width={200} height={200} src={process.env.REACT_APP_API_URL + master.image_master} className='my-5 mx-5 rounded' />
        <Container className='my-5'>
          <Container className='d-flex flex-row'>
            <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
              <span style={{ fontSize: 24, fontWeight: 500 }}>Имя:</span>
            </div>
            <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
              <span style={{ fontSize: 20, fontWeight: 400 }}>{master.fio}</span>
            </div>
          </Container>
          <Container className='d-flex flex-row align-items-bottom mt-3'>
            <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
              <span style={{ fontSize: 24, fontWeight: 500 }}>Информация:</span>
            </div>
            <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
              <span style={{ fontSize: 20, fontWeight: 400 }}>{master.info}</span>
            </div>
          </Container>
          <Container className='d-flex flex-row mt-3'>
            <div style={{ display: 'flex', 'align-items': 'flex-start' }}>
              <span style={{ fontSize: 24, fontWeight: 500 }}>Образование:</span>
            </div>
            <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10 }}>
              <span style={{ fontSize: 20, fontWeight: 400 }}>{master.education}</span>
            </div>
          </Container>
          <Container className='d-flex flex-row mt-3' style={{ flexFlow: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
              <span style={{ fontSize: 24, fontWeight: 500 }}>Услуги:</span>
            </div>
            {typesid.map(type =>
              <div style={{ display: 'flex', 'align-items': 'flex-end', "margin-left": 10, border: '1px solid', 'border-radius': "20px", paddingLeft: 5, paddingRight: 5, height: 30, whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 20, fontWeight: 400 }}>{type.type_name}</span>
              </div>
            )}

          </Container>
          <Container className='d-flex flex-row mt-3'>
            <div style={{ display: 'flex', 'align-items': 'start' }}>
              <span style={{ fontSize: 24, fontWeight: 500 }}>Адрес:</span>
            </div>
            <div style={{ display: 'flex', 'align-items': 'center', "margin-left": 10 }}>
              <span style={{ fontSize: 20, fontWeight: 400 }}>{master.address}</span>
            </div>
          </Container>
          {/* <div id="map-test" class="map-test" style={{ width: 550, height: 550 }}></div> */}

        </Container>
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
        {/* <YMaps>
          <div style={{ width: 350, height: 350 }}>
            <Map style={{ width: 350, height: 350 }} defaultState={{ center: [arrcoord[0], arrcoord[1]], zoom: 17 }}
              onClick={(event) => {
                const coords = event.get("coords");
                setNewCoords(() => coords);
              }}>
              <Placemark geometry={[arrcoord[0], arrcoord[1]]} />


            </Map>

          </div>
        </YMaps> */}


      </Container>
      <hr size="10px" />
      <Container>

      </Container>
      {showReviews == false ?
        <Container style={{ display: 'flex', flexDirection: 'row', 'align-items': 'flex-start', 'justify-content': 'space-around' }}>

          <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(false)}>
            <span style={{ fontSize: 24, fontWeight: 500 }}>Услуги</span>
          </div>
          <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(true)}>
            <span style={{ fontSize: 24, fontWeight: 500, color: '#C0C0C0' }}>Отзывы</span>
          </div>

        </Container>
        :
        <Container style={{ display: 'flex', flexDirection: 'row', 'align-items': 'flex-start', 'justify-content': 'space-around' }}>

          <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(false)}>
            <span style={{ fontSize: 24, fontWeight: 500, color: '#C0C0C0' }}>Услуги</span>
          </div>
          <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'center', cursor: 'pointer' }} onClick={() => show(true)}>
            <span style={{ fontSize: 24, fontWeight: 500 }}>Отзывы</span>
          </div>

        </Container>
      }


      {showReviews == false ?
        <Services servicesdata={servicesdata} />
        :
        <Reviews reviewsData={reviewsData} />

      }


    </Container>
  )
}

export default ProfileMasterPage
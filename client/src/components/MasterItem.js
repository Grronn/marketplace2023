import React, { useEffect, useState } from 'react';
import { Card, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { useNavigate } from "react-router-dom"
import { PROFILEMASTER_ROUTE } from '../utils/consts';
import { getTypesUserServices } from '../http/typeServicesAPI';
import { getReviewAverage, getReviewCount } from '../http/reviewAPI';

const MasterItem = ({ master }) => {
    const [typesid, setTypesid] = useState([])
    const [revCount, setRevCount] = useState()
    const [revAvg, setRevAvg] = useState()
    useEffect(() => {

        getTypesUserServices(master.id).then(data => setTypesid(data))
        getReviewCount(master.id).then(data => setRevCount(data))
        getReviewAverage(master.id).then(data => setRevAvg(data))

        // getTypesUserServicesname(typesid[i].type_service_id).then(data=>arr.push(data.name))s

    }, [])
    const history = useNavigate()
    console.log(history)
    return (

        <Card style={{ width: 700, cursor: "pointer" }} border='dark' className='d-flex flex-row mb-3' onClick={() => history(PROFILEMASTER_ROUTE + "/" + master.id)}>
            <Image width={100} height={100} src={process.env.REACT_APP_API_URL + master.image_master} className='my-2 mx-2 rounded' />
            <Container style={{ width: 700, cursor: "pointer", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: 24, fontWeight: 500 }}>
                    {master.fio}
                </div>
                <div style={{ display: 'grid', 'grid-template-columns': 'auto auto auto auto', flexDirection: 'row', height: 'auto', maxWidth: 100 }}>
                    {typesid.map(type =>

                        <span style={{ fontSize: 14, fontWeight: 400, border: '1px solid', 'border-radius': "20px", paddingLeft: 5, paddingRight: 5, marginRight: 5, marginTop: 5, width: 'auto', height: 25, whiteSpace: 'nowrap' }}>{type.type_name}</span>

                    )}
                </div>

            </Container>
            <Container style={{ display: 'flex', flexDirection: 'column', width: 150, justifyContent:'space-around' }}>
                <Container style={{ display: 'flex', flexDirection: 'row', }}>
                    <div style={{ lineHeight: 1, alignItems: 'flex-end', fontSize: 15, fontWeight: 500 }}>
                        Кол-во отзывов:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1, paddingLeft: 5, fontSize: 22, fontWeight: 500, width:30 }}>
                        {revCount}
                    </div>
                </Container>
                <Container style={{ display: 'flex', flexDirection: 'row', }}>
                    <div style={{ lineHeight: 1, alignItems: 'flex-end', fontSize: 15, fontWeight: 500 }}>
                        Средняя оценка:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1, paddingLeft: 5, fontSize: 22, fontWeight: 500, width:30 }}>
                        {revAvg}
                    </div>
                </Container>
            </Container>




        </Card>

    )
}

export default MasterItem
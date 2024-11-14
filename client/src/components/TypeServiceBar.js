import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { ListGroup } from 'react-bootstrap'
import { fetchTypeServices } from '../http/typeServicesAPI'
import { fetchMaster } from '../http/masterAPI'

const TypeServiceBar = observer(() => {
    const { master } = useContext(Context)
    useEffect(() => {
        fetchTypeServices().then(data => typeServices.setTypeServices(data))
    }, [])
    const { typeServices } = useContext(Context)
    const func = (type) => {
        typeServices.setSelectedType(type)
        fetchMaster(typeServices.selectedType.type_id).then(data => master.setMasters(data))
    }
    console.log(master)
    
    return (
        <ListGroup style={{ width: 300 }}>
            {typeServices.typeServices.map(type =>
                <ListGroup.Item
                    active={type.type_id === typeServices.selectedType.type_id}
                    key={type.type_id}
                    style={{ textAlign: 'center', cursor: "pointer" }}
                    onClick={()=>func(type)}
                    action variant="light"
                >
                    {type.type_name}
                </ListGroup.Item>

                // <MasterItem key={master.id} master={master} />
            )}


        </ListGroup>
    )
})

export default TypeServiceBar
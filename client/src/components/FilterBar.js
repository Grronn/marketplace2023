import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { ListGroup } from 'react-bootstrap'
import { fetchTypeServices } from '../http/typeServicesAPI'
import { fetchMaster } from '../http/masterAPI'


const FilterBar = () => {
  return (
    <ListGroup style={{ width: 300 }}>
            
                <ListGroup.Item
                    // active={type.type_id === typeServices.selectedType.type_id}
                    // key={type.type_id}
                    style={{ textAlign: 'center', cursor: "pointer" }}
                    
                    action variant="light"
                >
                    По количеству отзывов
                </ListGroup.Item>
                <ListGroup.Item
                    // active={type.type_id === typeServices.selectedType.type_id}
                    // key={type.type_id}
                    style={{ textAlign: 'center', cursor: "pointer" }}
                    
                    action variant="light"
                >
                    По средней оценке
                </ListGroup.Item>
                

            


        </ListGroup>
  )
}

export default FilterBar
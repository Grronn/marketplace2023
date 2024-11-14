import React, { useContext, useEffect } from 'react'
import MastersList from '../components/MastersList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchMaster } from '../http/masterAPI'
import { Col, Container, Row } from 'react-bootstrap'
import TypeServiceBar from '../components/TypeServiceBar'
import FilterBar from '../components/FilterBar'

const MastersPage = observer(() => {
  const { user } = useContext(Context)
  const { master } = useContext(Context)
  const { typeServices } = useContext(Context)
  useEffect(() => {
    fetchMaster(typeServices.selectedType.type_id, user.user.id).then(data => master.setMasters(data))
  }, [])
  console.log(typeServices.selectedType.type_id)
  console.log(master)
  return (

    <Row style={{ marginLeft: 250, marginTop: 80, marginRight:250 }}>
      
      <Col md={8}>
        <Container>
          <MastersList />
        </Container>
      </Col>
      <Col md={4}>
        <h5>
          Фильтрация по видам услуг:
        </h5>
        {/* <Container style={{ border: '1px solid', 'border-radius': "10px",justifyContent: 'center', width:250 }}>
          <Container>
            <div>
              dsdsd
            </div>
          </Container>
        </Container> */}
        <TypeServiceBar/>
        <br/>
        <h5>
          Сортировка:
        </h5>
        <FilterBar/>
      </Col>
    </Row>

  )
})

export default MastersPage
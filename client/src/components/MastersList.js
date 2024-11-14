import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import MasterItem from './MasterItem';


const MastersList = observer(() => {
const {master} = useContext(Context)
  return (
    <Container className='d-flex flex-column'>
        {master.masters.map(master =>
        <MasterItem key={master.id} master={master}/>
            )}
    </Container>
  )
})

export default MastersList
import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import { NavLink, useNavigate } from 'react-router-dom'
import { ACCOUNT, ADMIN, BECOME_MASTER_ROUTE, CREATE_SERVICE_ROUTE, LOGIN_ROUTE, MASTERS_ROUTE, ORDERED_SERVICES, ORDERED_SERVICES_CUSTOMER_ROUTE, ORDERED_SERVICES_MASTER_ROUTE, TASKS_CUSTOMER_ROUTE } from '../utils/consts'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
import { observer } from 'mobx-react-lite'


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        localStorage.removeItem('token')
        history(MASTERS_ROUTE)
    }
    return (
        <Navbar bg="dark" variant="dark" style={{ paddingTop: 0, paddingBottom: 0, height: 55 }}>
            <Container style={{ display: 'flex', justifyContent: 'end', marginTop: 0 }} >
                <NavLink style={{ textDecoration: 'none', color: 'white' }} to={MASTERS_ROUTE}>Красота рядом</NavLink>
                <Container>


                    {user.isAuth && user.user.role != 'ADMIN' ?
                        <Nav className='ml-auto' style={{ color: 'white', display: 'flex', justifyContent: 'end' }}>
                            {user.user.role == 'MASTER' ?


                                <>
                                    {/* <NavLink
                                        style={{ textDecoration: 'none', color: 'white', borderLeft: '1px solid grey', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                        to={CREATE_SERVICE_ROUTE + "/" + user.user.id}
                                    >
                                        Добавить услугу
                                    </NavLink> */}
                                    <NavLink
                                        style={{ textDecoration: 'none', color: 'white', borderLeft: '1px solid grey', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                        to={ACCOUNT + "/" + user.user.id}
                                    >
                                        Профиль
                                    </NavLink>
                                    {/* <NavLink
                                        style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                        to={ORDERED_SERVICES_MASTER_ROUTE + "/" + user.user.id}
                                    >
                                        У меня заказали
                                    </NavLink> */}

                                </>


                                :
                                <Container>

                                    <NavLink
                                        style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                        to={BECOME_MASTER_ROUTE + "/" + user.user.id}
                                    >
                                        Стать мастером
                                    </NavLink>

                                </Container>

                            }
                            <NavLink
                                style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                to={TASKS_CUSTOMER_ROUTE + "/" + user.user.id}
                            >
                                Задания
                            </NavLink>
                            <NavLink
                                style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                to={ORDERED_SERVICES_CUSTOMER_ROUTE + "/" + user.user.id}
                            >
                                Услуги
                            </NavLink>
                            <NavLink
                                style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </NavLink>


                        </Nav>
                        :user.user.role != 'ADMIN'?
                        <Nav className="ml-auto" style={{ color: 'white' }}>

                            <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                        :<></>

                    }
                    {user.isAuth && user.user.role == 'ADMIN' ?
                        <Nav className='ml-auto' style={{ color: 'white', display: 'flex', justifyContent: 'end' }}>
                            <NavLink
                                style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                to={ADMIN}
                            >
                                Админ панель
                            </NavLink>
                            <NavLink
                                style={{ textDecoration: 'none', color: 'white', borderRight: '1px solid grey', height: 55, padding: 5, display: 'flex', alignItems: 'center' }}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </NavLink>
                        </Nav> :
                        <></>
                    }
                </Container>
                {user.isAuth
                    ?
                    <Nav style={{ width: 200, color: 'white' }}>
                        {user.user.fio}
                    </Nav>
                    :
                    <></>
                }



            </Container>

        </Navbar >
    )
})

export default NavBar
import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { set } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { MASTERS_ROUTE } from '../utils/consts';
import jwt_decode from "jwt-decode";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const history = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            }
            else {
                data = await registration(email, password, phoneNumber);
                console.log(user)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if(email=="admin")
            {
                history(ADMIN)
            }
            else{
                history(MASTERS_ROUTE)
            }
            
        }
        catch (e) {
            alert(e.response.data.message)
        }

    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    {isLogin ? <></> : 
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш номер'
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />}

                    <Container className="d-flex justify-content-between mt-3 px-0">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={'outline-success'}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Container>
                </Form>
            </Card>

        </Container>

    )
})

export default Auth;
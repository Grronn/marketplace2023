import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { MASTERS_ROUTE, ORDERED_SERVICES } from '../utils/consts'
import OrderedServices from '../pages/OrderedServices'
import MastersPage from '../pages/MastersPage'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} Component={Component} exact/>
        )}

        {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} Component={Component} exact/>
        )}
    </Routes>
  )
})

export default AppRouter
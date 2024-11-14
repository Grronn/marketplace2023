import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, phone_number) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER',phone_number})
    
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    if(data.token)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const createTimesheet = async (user_id, time, time_date) => {

    const {data} = await $authHost.post('api/user/createtimesheet/'+user_id,{user_id, time, time_date})
    return data


}
export const getTimesheet = async (user_id, time_date) => {

    const {data} = await $authHost.get('api/user/gettimesheet/'+user_id,{params: {
        user_id,time_date
    }})
    return data


}
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const becomeMasterfunction = async (id, master) => {
    
    const {data} = await $authHost.put('api/user/becomemaster/'+id, master) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const fetchMaster = async (type_service_id,id) => {
    const {data} = await $host.get('api/user/',{params: {
        type_service_id,id
    }})
    return data
}

export const fetchOneMaster = async (id) => {
    const {data} = await $host.get('api/user/'+id, id)
    return data
}
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const fetchTypeServices = async () => {
    const {data} = await $host.get('api/typeservice')
    return data
}

export const addTypesUserServices = async (user_id, type_service_id) => {

        const {data} = await $authHost.post('api/typeuserservice',{user_id,type_service_id})
        return data
    

}

export const getTypesUserServices = async (user_id) => {

    const {data} = await $authHost.get('api/typeuserservice/idtype/'+user_id,user_id)
    return data


}

import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createService = async (service) => {
    
    const {data} = await $authHost.post('api/service/', service)
    return data
}

export const getServicesMaster = async (id) => {
    
    const {data} = await $authHost.get('api/service/'+id)
    return data
}

export const getServicesAll = async (id) => {
    
    const {data} = await $authHost.get('api/service/')
    return data
}

export const createServiceOrdered = async (usermaster_id,usercustomer_id,service_id, service_date) => {
    
    const {data} = await $authHost.post('api/serviceordered', {usermaster_id,usercustomer_id,service_id, service_date})
    return data
}

export const getServiceOrderedMaster = async (id) => {
    
    const {data} = await $authHost.get('api/serviceordered/master/'+id, id)
    return data
}
export const getServiceOrderedCustomer = async (id) => {
    
    const {data} = await $authHost.get('api/serviceordered/customer/'+id, id)
    return data
}

export const getHistoryServiceOrderedCustomer = async (id) => {
    
    const {data} = await $authHost.get('api/serviceordered/historyservice/'+id, id)
    return data
}

export const getHistoryServiceOrderedMaster = async (id) => {
    
    const {data} = await $authHost.get('api/serviceordered/historyservicemaster/'+id, id)
    return data
}

export const deleteServiceOrdered = async (id) => {
    
    const {data} = await $authHost.delete('api/serviceordered/delete/'+id, id)
    return data
}

export const doServiceOrdered = async (service_ordered_id) => {
    
    const {data} = await $authHost.put('api/serviceordered/do/', {service_ordered_id})
    return data
}

export const setReviewServiceOrdered = async (service_ordered_id) => {
    
    const {data} = await $authHost.put('api/serviceordered/do/', {service_ordered_id})
    return data
}
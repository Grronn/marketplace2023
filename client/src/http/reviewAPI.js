import {$authHost, $host} from "./index";

export const createReview = async (service_ordered_id,usercustomer_id, service_id, rate, text_review, usermaster_id) => {
    
    const {data} = await $authHost.post('api/review/', {service_ordered_id,usercustomer_id, service_id, rate, text_review, usermaster_id})
    return data
}

export const createReviewUpdate = async (service_ordered_id) => {
    
    const {data} = await $authHost.put('api/review/update/'+service_ordered_id, {service_ordered_id})
    return data
}

export const getReview = async (id) => {
    
    const {data} = await $authHost.get('api/review/'+id, {id})
    return data
}

export const getReviewCount = async (id) => {
    
    const {data} = await $authHost.get('api/review/reviewcount/'+id, {id})
    return data
}
export const getReviewAverage = async (id) => {
    
    const {data} = await $authHost.get('api/review/reviewaverage/'+id, {id})
    return data
}

export const fetchMaster = async (type_service_id) => {
    const {data} = await $host.get('api/user/',{params: {
        type_service_id
    }})
    return data
}

export const fetchOneMaster = async (id) => {
    const {data} = await $host.get('api/user/'+id, id)
    return data
}
import {$authHost, $host} from "./index";

export const createTask = async (task) => {
    
    const {data} = await $authHost.post('api/task/', task) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}
export const getTask = async (id) => {
    
    const {data} = await $authHost.get('api/task/'+id,id) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const getAllTask = async (id) => {
    
    const {data} = await $authHost.get('api/task/alltasks/',id) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const respondTask = async (task_id,usermaster_id,usercustomer_id) => {
    
    const {data} = await $authHost.post('api/task/respond/'+usermaster_id,{task_id,usermaster_id,usercustomer_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}


export const getRespondMasters = async (task_id) => {
    
    const {data} = await $authHost.get('api/task/masterresponsed/'+task_id,{task_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const getTaskOrderedCustomers = async (usercustomer_id) => {
    
    const {data} = await $authHost.get('api/task/taskorderedcustomer/'+usercustomer_id,{usercustomer_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const getTaskHistoryCustomers = async (usercustomer_id) => {
    
    const {data} = await $authHost.get('api/task/historytaskcustomer/'+usercustomer_id,{usercustomer_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const getTaskOrderedMaster = async (usermaster_id) => {
    
    const {data} = await $authHost.get('api/task/taskorderedmaster/'+usermaster_id,{usermaster_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const getHistoryTaskMaster = async (usermaster_id) => {
    
    const {data} = await $authHost.get('api/task/historytaskmaster/'+usermaster_id,{usermaster_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const createOrderedTask = async (usermaster_id,usercustomer_id,task_id) => {
    
    const {data} = await $authHost.post('api/task/createorderedtask/'+usercustomer_id, {usermaster_id,usercustomer_id,task_id}) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const deleteTaskWhenOrdered = async (id) => {
    
    const {data} = await $authHost.delete('api/task/deletetaskwhenordered/'+id, id) //сделать на сервере новый метод в роуте на него кинуть мидл вейр на проверку роль USER
    return data
}

export const doTaskOrdered = async (task_ordered_id) => {
    
    const {data} = await $authHost.put('api/task/dotaskordered/'+task_ordered_id, {task_ordered_id})
    return data
}

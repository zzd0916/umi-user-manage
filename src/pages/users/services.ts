import http from '@/utils/http'
import { FormValues } from './data.d'

export const getRemoteList = async () => {
    return http('/api/users', {
        method: 'get'
    })
        .then( res =>  {
            return res
        })
        .catch( err => {
            return false
        });
}

export const editRecord = async ({id, values} : {id: number, values: FormValues }) => {
    return http(`/api/users/${id}`, {
        method: 'put',
        data: values
    })
        .then( res => {            
            return true
        })
        .catch( err => {
            return false
        });
}

export const addRecord = async ({values}: {values: FormValues}) => {
    return http(`/api/users`, {
        method: 'post',
        data: values
    })
        .then( res => {            
            return true
        })
        .catch( err => {
            return false
        });
}

export const deleteRecord = async ({id}: {id:number}) => {
    return http(`/api/users/${id}`, {
        method: 'delete',
    })
        .then( res => {            
            return true
        })
        .catch(err => {
            return false
        });
}
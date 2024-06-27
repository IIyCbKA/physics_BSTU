import axios from 'axios'

export const SERVER_ADR = ''
export const SERVER = SERVER_ADR

const $host = axios.create({
    baseURL: SERVER
})


export {$host}

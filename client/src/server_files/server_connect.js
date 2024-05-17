import axios from 'axios'

export const SERVER_ADR = '192.168.1.38:5000'
export const SERVER = 'http://' + SERVER_ADR

const $host = axios.create({
    baseURL: SERVER
})


export {$host}

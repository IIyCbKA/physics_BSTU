import axios from 'axios'

export const SERVER_ADR = 'server:5000'
export const SERVER = 'http://' + SERVER_ADR

const $host = axios.create({
    baseURL: SERVER
})


export {$host}

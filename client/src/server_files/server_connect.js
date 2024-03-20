import axios from 'axios'

export const SERVER_ADR = 'localhost:5000'
export const SERVER = 'http://' + SERVER_ADR

const $host = axios.create({
    baseURL: SERVER
})


export {$host}
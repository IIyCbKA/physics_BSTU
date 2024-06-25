import axios from 'axios'

export const SERVER_ADR = 'nginx/api'
export const SERVER = 'http://' + SERVER_ADR

const $host = axios.create({
    baseURL: SERVER
})


export {$host}

import axios from 'axios'

const SERVER = 'http://localhost:5000'

const $host = axios.create({
    baseURL: SERVER
})

export {$host}
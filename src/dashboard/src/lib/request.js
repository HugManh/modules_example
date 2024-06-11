import axios from "axios";

let baseURL = process.env.API_URL || 'http://localhost:3000/api/v1'

export const service = axios.create({
    baseURL, // url = base url + request url
    // withCredentials: false, // send cookies when cross-domain requests
    timeout: 15000 // request timeout
})
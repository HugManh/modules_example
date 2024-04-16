import axios from "axios";

// create an axios instance
const service = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // url = base url + request url
    // withCredentials: false, // send cookies when cross-domain requests
    timeout: 15000 // request timeout
})

export default service
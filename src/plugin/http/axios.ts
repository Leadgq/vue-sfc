import Axios from "./index"
const http = new Axios({
    timeout: 5000,
    headers: {},
    baseURL: '/api',
    withCredentials: true
})

export { http }
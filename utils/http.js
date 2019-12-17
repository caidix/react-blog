const axios = require('axios');
const http = axios.create({
    baseURL: 'http://localhost:7000/blog/api'
})

http.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})

module.exports = http;
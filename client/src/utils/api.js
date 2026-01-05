import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cityday-api.onrender.com',
    withCredentials: true,
});

export default api;

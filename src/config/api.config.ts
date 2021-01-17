import axios from 'axios';

export const LocalAxios = axios.create({
    baseURL: '/api/',
    timeout: 6000,
});

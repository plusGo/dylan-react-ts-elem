import axios from 'axios';

export const LocalAxios = axios.create({
    baseURL: '/api/v1/',
    timeout: 6000,
});

import axios from 'axios';

export const LocalAxios = axios.create({
    baseURL: 'https://elm.cangdu.org/v1/',
    timeout: 6000,
});

import Axios from 'axios';

export const axiosInstance = new Axios.create({
    baseURL: process.env.API_URL
})
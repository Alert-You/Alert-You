import axios from 'axios';
import { getAccessToken } from '@/utils/auth';
import {BASE_URL} from './urls';

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

AxiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await getAccessToken();
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

AxiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default AxiosInstance;
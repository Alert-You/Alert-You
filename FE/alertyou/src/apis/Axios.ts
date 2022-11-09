import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

const AxiosInstance = axios.create({
  baseURL: 'https://k7b109.p.ssafy.io/api/',
  timeout: 1000,
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
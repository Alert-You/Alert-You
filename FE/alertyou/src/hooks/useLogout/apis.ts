import axios from 'axios';
import {BASE_URL, LOGOUT} from '@/apis/urls';
import {logoutResponseType} from './types';

export const logoutRequest = async (): Promise<logoutResponseType> => {
  const {data} = await axios.post(`${BASE_URL}${LOGOUT}`);
  console.log(data);
  return data;
};

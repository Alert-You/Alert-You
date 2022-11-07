import axios from 'axios';
import {BASE_URL, LOGOUT} from '@/apis/urls';
import {logoutResponseType} from './types';

export const logoutRequest = async (refreshToken: string): Promise<logoutResponseType> => {
  const {data} = await axios.post(`${BASE_URL}${LOGOUT}`, {}, {
    headers: {
      refreshToken: refreshToken
    }
  });
  return data;
};
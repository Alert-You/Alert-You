import axios from 'axios';
import {LOGOUT} from '@/apis/urls';
import {logoutResponseType} from './types';

export const logoutRequest = async (refreshToken: string): Promise<logoutResponseType> => {
  const {data} = await axios.post(`${LOGOUT}`, {}, {
    headers: {
      refreshToken: refreshToken
    }
  });
  return data;
};
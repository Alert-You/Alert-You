import {LOGOUT} from '@/apis/urls';
import {logoutResponseType} from './types';
import AxiosInstance from '@/apis/Axios';

export const logoutRequest = async (refreshToken: string): Promise<logoutResponseType> => {
  const {data} = await AxiosInstance.post(LOGOUT, {}, {
    headers: {
      refreshToken: refreshToken
    }
  });
  return data;
};
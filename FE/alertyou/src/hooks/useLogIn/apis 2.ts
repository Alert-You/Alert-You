import {BASE_URL, LOGIN} from '@/apis/urls';
import { toastType } from '@/types/toastType';
import axios from 'axios';
import {loginValueType} from './types';

export const loginRequest = async (credentials: loginValueType): Promise<toastType> => {
  const {data} = await axios.post(`${BASE_URL}${LOGIN}`, credentials);
  return data;
};

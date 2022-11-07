import {BASE_URL, VERIFICATION} from '@/apis/urls';
import axios from 'axios';
import { verifyResponseType } from './types';

export const fetchAuthKey = async (phone: string): Promise<verifyResponseType> => {
  const {data} = await axios.post(`${BASE_URL}${VERIFICATION}?phone=${phone}`);
  return data;
};

import {BASE_URL, VERIFICATION} from '@/apis/urls';
import axios from 'axios';

export const fetchAuthKey = async (phone: string) => {
  const {data} = await axios.post(`${BASE_URL}${VERIFICATION}?phone=${phone}`);
  return data;
};

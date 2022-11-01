import {BASE_URL, VERIFICATION} from '@/apis/urls';
import axios from 'axios';

export const fetchAuthKey = async () => {
  const {data} = await axios.post(`${BASE_URL}${VERIFICATION}?phone=01022420407`);
  return data;

  // return axios.get(`${BASE_URL}${VERIFICATION}`)
};

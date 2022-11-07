import {REFRESH} from '@/apis/urls';
import axios from 'axios';

export const requestRefreshToken = async (
  refreshToken: string,
): Promise<any> => {
  const {data} = await axios.post(`${REFRESH}`, refreshToken);
  return data;
};

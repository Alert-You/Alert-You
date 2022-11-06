import { BASE_URL, REFRESH } from '@/apis/urls';
import axios from 'axios';

export const requestRefreshToken = async (refreshToken: string): Promise<any> => {
  const {data} = await axios.post(`${BASE_URL}${REFRESH}`, {
    data: {
      refreshToken
    }
  })
  return data
}
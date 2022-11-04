import {BASE_URL, LOGIN} from '@/apis/urls';;
import axios from 'axios';

import {loginValueType, TokenType} from './types';

export const loginRequest = async (credentials: loginValueType): Promise<TokenType> => {
  const {data} = await axios.post(`${BASE_URL}${LOGIN}`, credentials);
  return data;
};

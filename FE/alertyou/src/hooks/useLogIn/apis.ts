import {LOGIN} from '@/apis/urls';;
import axios from 'axios';

import {loginValueType, TokenType} from './types';

export const loginRequest = async (credentials: loginValueType): Promise<TokenType> => {
  const {data} = await axios.post(LOGIN, credentials);
  return data;
};

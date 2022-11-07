import {BASE_URL, SIGNUP, VERIFICATION} from '@/apis/urls';
import { signUpType } from '@/store/signUpState';
import axios from 'axios';
import { verifyResponseType } from './types';

export const fetchAuthKey = async (phone: string): Promise<verifyResponseType> => {
  const {data} = await axios.post(`${BASE_URL}${VERIFICATION}?phone=${phone}`);
  return data;
};

export const reqeustSignUp = async (credentials: signUpType) => {
  const {data} = await axios.post(`${BASE_URL}${SIGNUP}`, credentials)
  return data
}

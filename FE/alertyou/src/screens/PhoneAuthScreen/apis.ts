import {SIGNUP, VERIFICATION} from '@/apis/urls';
import { signUpType } from '@/store/signUpState';
import axios from 'axios';
import { verifyResponseType } from './types';

export const fetchAuthKey = async (phone: string): Promise<verifyResponseType> => {
  const {data} = await axios.post(`${VERIFICATION}?phone=${phone}`);
  return data;
};

export const reqeustSignUp = async (credentials: signUpType) => {
  const {data} = await axios.post(`${SIGNUP}`, credentials)
  return data
}

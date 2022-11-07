import axios from 'axios';

import {SCHOOL_LIST} from '@/apis/urls';

import {schoolResponseType} from './types';

export const requestSchoolData = async (
  schoolName: string,
): Promise<schoolResponseType> => {
  const {data} = await axios.get(`${SCHOOL_LIST}?word=${schoolName}`);
  return data;
};

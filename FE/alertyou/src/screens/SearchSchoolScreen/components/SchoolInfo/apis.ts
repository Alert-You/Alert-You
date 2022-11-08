import axios from 'axios';

import {SCHOOL} from '@/apis/urls';

import {gradeClassType} from './types';

export const requestGradeClass = async (
  schoolName: string,
): Promise<gradeClassType> => {
  const {data} = await axios.get(`${SCHOOL}?name=${schoolName}`);
  return data;
};

import axios from 'axios';

import {BASE_URL, SCHOOL} from '@/apis/urls';

import {gradeClassType} from './types';

export const requestGradeClass = async (
  schoolName: string,
): Promise<gradeClassType> => {
  const {data} = await axios.get(
    `${BASE_URL}${SCHOOL}?name=${schoolName}`,
  );
  console.log(data)
  return data;
};

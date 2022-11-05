import axios from 'axios';

import {BASE_URL, SCHOOL} from '@/apis/urls';

import {gradeClassType} from './types';

export const requestGradeClass = async (
  schoolName: string,
): Promise<gradeClassType> => {
  const {data} = await axios.get(
    `http://k7b109.p.ssafy.io:8085/api/school?name=싸피고등학`,
  );
  return data;
};

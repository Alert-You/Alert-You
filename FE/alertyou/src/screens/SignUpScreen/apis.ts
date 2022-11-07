
import axios from 'axios';

import { BASE_URL, SCHOOL_ID } from '@/apis/urls';

import { schoolIdType } from './types';

export const requestSchoolId = async (name:string, grade: string, classroom:string): Promise<schoolIdType> => {
  const {data} = await axios.get(`${BASE_URL}${SCHOOL_ID}?name=${name}&grade=${parseInt(grade)}&classRoom=${classroom}`);
  return data  
}
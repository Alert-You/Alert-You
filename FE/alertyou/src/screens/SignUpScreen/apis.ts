import axios from 'axios';

import {SCHOOL_ID} from '@/apis/urls';

import {schoolIdType} from './types';

export const requestSchoolId = async (
  name: string,
  grade: string,
  classroom: string,
  address: string,
): Promise<schoolIdType> => {
  const {data} = await axios.get(SCHOOL_ID, {
    params: {
      name,
      address,
      grade: parseInt(grade),
      classRoom: classroom,
    },
  });
  console.log(data);
  return data;
};

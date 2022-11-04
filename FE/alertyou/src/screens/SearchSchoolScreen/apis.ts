import axios from "axios"

import { BASE_URL, SCHOOL_LIST } from '@/apis/urls';

import { schoolResponseType } from "./types";

export const requestSchoolData = async (schoolName:string): Promise<schoolResponseType> => {
  const {data} = await axios.get(`${BASE_URL}${SCHOOL_LIST}?word=${schoolName}`)
  return data
}
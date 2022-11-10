import AxiosInstance from "@/apis/Axios"
import { EDIT, PROFILE, VERIFICATION } from "@/apis/urls"
import { profileFormType } from "@/store/profileState"
import axios from "axios"

import { editResponseType, profileResponseType, verifyResponseType } from "./types"

export const requestAccountInfo = async (): Promise<profileResponseType> => {
  const {data} = await AxiosInstance.get(PROFILE)
  return data
}

export const fetchAuthKey = async (
  phone: string,
): Promise<verifyResponseType> => {
  const {data} = await axios.post(`${VERIFICATION}?phone=${phone}`);
  return data;
};

export const requestEdit = async (credentials: profileFormType): Promise<editResponseType> => {
  const {data} = await AxiosInstance.put(EDIT, credentials);
  return data
}
import AxiosInstance from "@/apis/Axios"
import { PROFILE } from "@/apis/urls"

import { profileResponseType } from "./types"

export const requestAccountInfo = async (): Promise<profileResponseType> => {
  const {data} = await AxiosInstance.get(PROFILE)
  return data
}
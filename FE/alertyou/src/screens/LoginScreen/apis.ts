import axios from "axios";
import { loginValueType } from "./types";

export const loginRequest = (credentials: loginValueType) => {
  return axios.post("URL", credentials)
}
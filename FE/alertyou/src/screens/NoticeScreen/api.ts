import AxiosInstance from "@/apis/Axios";
import { noticeListType, reportType } from "@/types";

export const getNoticeList = async (): Promise<noticeListType> => {
  const result = await AxiosInstance.get("alert/list")
    .then((response) => response);
  return result.data;
};

export const getNoticeItem = async (reportId: number | undefined): Promise<reportType> => {
  const result = await AxiosInstance
    .get(`report/detail`, { params: { reportId } })
    .then((response) => response);
  return result.data.report;
};

export const checkNotice = async (alertId: number) => {
  const result = await AxiosInstance.put(`alert/check?alertId=${alertId}`)
    .then(res => res)
  return result
}

export const checkNoticeAll = async () => {
  const result = await AxiosInstance.put("alert/allcheck")
    .then(res => res)
  return true
}

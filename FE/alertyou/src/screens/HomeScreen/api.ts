import { LocationType } from '@/types';
import AxiosInstance from '@/apis/Axios';
import { ReportModalDataType } from './components/ReportModal/types';

interface SimpleMsgType {
  msg: string;
}

export const reportVictim = async (
  location: LocationType,
): Promise<SimpleMsgType> => {
  const result = await AxiosInstance.post('report/victim', location)
    .then(response => response)
    .catch(err => err);
  return result.data;
};

export const reportWitness = async (
  data: ReportModalDataType,
): Promise<SimpleMsgType> => {
  const result = await AxiosInstance.post('report/witness', data)
    .then(response => response)
    .catch(err => err);
  return result.data;
};

export const saveToken = async (fcmToken: string) => {
  const result = await AxiosInstance.put('report/fcmtoken', { fcmToken: fcmToken })
    .then(response => { response; console.log('토큰 저장 성공') })
    .then(err => err)
  return true
}
import {LocationType} from '@/types';
import AxiosInstance from '@/apis/Axios';

interface SimpleMsgType {
  msg: string;
}

export const reportVictim = async (
  location: LocationType,
): Promise<SimpleMsgType> => {
  if (!location) return {msg: 'FAIL'};
  const result = await AxiosInstance.post('report/victim', location)
    .then(response => response)
    .catch(err => err);
  return result.data;
};

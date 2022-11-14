import {LocationType} from '@/types';
import AxiosInstance from '@/apis/Axios';
import {ReportModalDataType} from './components/ReportModal/types';
import axios from 'axios';
import {BASE_URL} from '@/apis/urls';
import {getAccessToken} from '@/utils/auth';

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

export const reportFile = async (file: string | undefined) => {
  try {
    if (!file) {
      throw new Error('no file URI');
    }
    const extension = findExtension(file) === 'mp4' ? 'mp4' : 'jpg';
    const fileType = extension === 'mp4' ? 'audio' : 'image';
    let fileData = {
      uri: file,
      type: `${fileType}/${extension}`,
      name: `${new Date().getTime()}.${extension}`,
    };
    const fileFormData = new FormData();
    fileFormData.append('file', fileData);
    const token = await getAccessToken();
    const result: Response = await fetch(`${BASE_URL}proof/upload`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: fileFormData,
      method: 'POST',
    });
    return result.status;
  } catch (error) {
    console.log('unexpected error: ', error);
    return 'An unexpected error occurred';
  }
};

const findExtension = (path: string) => {
  const pl = path.length;
  return path.slice(pl - 3, pl);
};

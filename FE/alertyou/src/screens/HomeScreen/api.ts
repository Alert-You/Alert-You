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

// export const reportFile = async (file: any): Promise<SimpleMsgType> => {
//   const result = await axios({
//     url: 'proof/upload',
//     methods: 'post',
//     data: {file}
//   })
//     .then(response => response)
//     .catch(err => err);
//   return result.data;
// };

interface fileType {
  file: any;
}

export const reportFile = async (file: any) => {
  console.log('file:', typeof file, file);
  const extension = findExtension(file) === 'mp4' ? 'mp4' : 'jpg';
  const fileType = extension === 'mp4' ? 'audio' : 'image';
  // let fileData = {
  //   uri: file,
  //   type: 'image/jpg',
  //   name: `${new Date().getTime()}.${extension}`,
  // };
  // console.log('아니뭔데 안나와')
  // const response = await fetch(file);
  // const blob = await response.blob();
  let fileData = {
    uri: file,
    type: `${fileType}/${extension}`,
    name: `${new Date().getTime()}.${extension}`,
  };
  const fileFormData = new FormData();
  fileFormData.append('file', fileData);
  try {
    const token = await getAccessToken();
    const result = await fetch(`${BASE_URL}proof/upload`, {
      method: 'POST',
      body: fileFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    // const result = await axios.post<fileType>(
    //   `${BASE_URL}proof/upload`,
    //   {file: fileFormData},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type':
    //         'multipart/form-data; boundary=someArbitraryUniqueString',
    //     },
    //     transformRequest: (data, headers) => {
    //       return data;
    //     },
    //   },
    // );
    console.log('result : ', result);
    return result;
  } catch (error) {
    console.log(error);
    // if (axios.isAxiosError(error)) {
    //   console.log('error.request: ', error.request);
    //   console.log('error.response: ', error.response);
    //   console.log('error.config: ', error.config);
    //   console.log('error message: ', error.message);
    //   // 👇️ error: AxiosError<any, any>
    //   return error.message;
    // } else {
    //   console.log('unexpected error: ', error);
    //   return 'An unexpected error occurred';
    // }
  }
};

const findExtension = (path: string) => {
  const pl = path.length;
  return path.slice(pl - 3, pl);
};

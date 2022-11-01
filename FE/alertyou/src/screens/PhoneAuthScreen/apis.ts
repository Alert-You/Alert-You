import { BASE_URL, VERIFICATION } from '@/apis/urls';
import axios from 'axios';

export const fetchAuthKey = async ():Promise<any> => {
  const {data} = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/1'
  );
  return data
  // axios
  //   .get('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(res => res.data);
  // return axios.get(`${BASE_URL}${VERIFICATION}`)
}
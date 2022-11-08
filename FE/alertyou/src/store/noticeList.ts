import { atom, selector } from 'recoil';
import { noticeListType } from '@/types';
// import axios, { AxiosResponse } from 'axios';

// type Response = AxiosResponse<noticeList[]>;

const initialState: noticeListType[] = [
  {
    isVictim: true,
    noticeDateTime: '2022-11-01 23:50',
    reportId: 4,
    checked: false
  },
  {
    isVictim: false,
    noticeDateTime: '2022-10-31 20:50',
    reportId: 3,
    checked: false
  },
  {
    isVictim: false,
    noticeDateTime: '2022-10-30 20:50',
    reportId: 2,
    checked: true
  },
  {
    isVictim: true,
    noticeDateTime: '2022-10-29 20:50',
    reportId: 1,
    checked: true
  }]

export const noticeListState = atom<noticeListType[]>({
  key: 'noticeListState',
  default: initialState,
});

// const getNoticeList = (): Promise<Response> => axios.get('example.com/data');

// const asyncDataQuery = selector<noticeList[]>({
//   key: 'asyncDataQuery',
//   get: async () => {
//     const response = await getNoticeList();
//     return response.data;
//   },
// });
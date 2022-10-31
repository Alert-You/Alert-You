import { atom, selector } from 'recoil';
import { noticeListType } from '@/types';
// import axios, { AxiosResponse } from 'axios';

// type Response = AxiosResponse<noticeList[]>;

const initialState: noticeListType[] = [
  {
    isVictim: true,
    noticeDate: '2022-01-19',
    noticeTime: '14:26',
    reportId: 4,
    checked: false
  },
  {
    isVictim: false,
    noticeDate: '2022-01-19',
    noticeTime: '14:21',
    reportId: 3,
    checked: false
  },
  {
    isVictim: false,
    noticeDate: '2022-01-19',
    noticeTime: '11:20',
    reportId: 2,
    checked: true
  },
  {
    isVictim: true,
    noticeDate: '2022-01-18',
    noticeTime: '13:20',
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
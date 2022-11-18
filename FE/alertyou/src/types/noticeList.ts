export interface noticeItemType {
  isVictim: boolean,
  noticeDateTime: string,
  reportId: number,
  alertId: number
}

export interface noticeListType {
  read: noticeItemType[],
  unRead: noticeItemType[]
}

export interface reportType {
  reportId: number | undefined,
  noticeDateTime: string,
  content: string,
  isVictim: boolean | null,
  location: string,
  place: string,
  latitude: number,
  longitude: number,
}

export interface repType {
  reportId: number,
  noticeDateTime: string,
  isVictim: boolean,
}
export interface noticeListType {
  isVictim: boolean,
  noticeDateTime: string,
  reportId: number,
  checked: boolean
}

export interface reportType {
  reportId: number | undefined,
  noticeDateTime: string,
  content: string,
  isVictim: boolean,
  location: string,
  latitude: number,
  logitude: number,
}
export interface schoolInfoType {
  address: string,
  name: string
}

export interface schoolResponseType {
  msg: string,
  schools: schoolInfoType[]
}
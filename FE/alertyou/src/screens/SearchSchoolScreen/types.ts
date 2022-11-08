export interface schoolInfoType {
  address: string,
  name: string
}

export interface schoolResponseType {
  msg: string,
  schools: schoolInfoType[]
}

export interface gradeClassType {
  msg: string;
  classes: string[][] | any;
}

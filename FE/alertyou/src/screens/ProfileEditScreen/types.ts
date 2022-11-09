export interface profileResponseType {
  message: string;
  name: string;
  phone: string;
  role: string;
  schoolId: number;
  schoolName: string;
  statusCode: number;
}

export interface EditProfileActionType {
  type: string;
  payload: string;
}

export interface EditProfileState {
  username: string;
  phone: string;
  password: string;
  schoolId: null | number;
}

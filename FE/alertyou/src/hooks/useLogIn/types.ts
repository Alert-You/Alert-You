export interface loginValueType {
  phone: string;
  password: string;
}

export interface TokenType {
  accessToken: string;
  message: string;
  refreshToken: string;
  statusCode: number;
}

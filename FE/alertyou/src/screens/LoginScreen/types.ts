export interface loginValueType {
  phone: string;
  password: string;
}

export interface loginActionType {
  type: string;
  payload: string;
}

export interface TokenType {
  data: {
    msg: string;
    tokenId: string;
  };
}


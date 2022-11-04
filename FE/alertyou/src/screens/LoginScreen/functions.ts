import {Alert} from 'react-native';
import type {loginActionType, loginValueType} from './types';

export const loginInitialState: loginValueType = {
  phone: '',
  password: '',
};

export const loginReducer = (
  state: loginValueType,
  action: loginActionType,
): loginValueType => {
  switch (action.type) {
    case 'phone': {
      return {
        ...state,
        phone: action.payload.trim(),
      };
    }
    case 'password': {
      return {
        ...state,
        password: action.payload.trim(),
      };
    }
    default:
      return state;
  }
};

export const phoneValidation = (phone: string): boolean => {
  if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export const failPhoneValidation = () => {
  Alert.alert('로그인 실패', '휴대폰 번호는 숫자만 입력해주세요.', [
    {text: '확인'},
  ]);
};

export const onFailHandler = () => {
  Alert.alert('로그인 실패', '휴대폰 번호, 비밀번호를 확인해주세요.', [
    {text: '확인'},
  ]);
};

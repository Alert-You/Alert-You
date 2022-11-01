import {Alert} from 'react-native';
import type {loginActionType, loginValueType} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        phone: action.payload,
      };
    }
    case 'password': {
      return {
        ...state,
        password: action.payload,
      };
    }
    default:
      return state;
  }
};

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch {
    console.log('기기에 토큰 저장 실패');
  }
}

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

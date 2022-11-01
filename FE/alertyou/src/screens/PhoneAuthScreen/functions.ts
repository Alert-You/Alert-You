import {Alert} from 'react-native';

export const phoneValidation = (phone: string): boolean => {
  if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export const onFailHandler = () => {
  Alert.alert('인증 실패', '휴대폰 번호가 유효하지 않습니다.', [
    {text: '확인'},
  ]);
};
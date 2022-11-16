import {Alert} from 'react-native';

export const phoneValidation = (phone: string): boolean => {
  if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export const onFailHandler = () => {
  Alert.alert('유효하지 않은 휴대폰 번호', '휴대폰 번호가 유효하지 않습니다.', [
    {text: '확인'},
  ]);
};

export const onVerifySuccess = () => {
  Alert.alert('인증 성공', '인증이 완료되었습니다.', [
    {text: '확인'},
  ]);
};

export const onVerifyFail = () => {
  Alert.alert('인증 번호 불일치', '인증 번호가 일치하지 않습니다.', [
    {text: '확인'},
  ]);
};

export const failSignUp = () => {
  Alert.alert('인증 실패', '인증에 실패했습니다. 다시 인증을 진행해주세요..', [{text: '확인'}]);
}

export const errorOccured = (err:string) => {
  Alert.alert('오류 발생', err, [{text: '확인'}]);
}

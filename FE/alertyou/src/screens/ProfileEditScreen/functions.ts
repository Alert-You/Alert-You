import {Alert} from 'react-native';

export const phoneValidation = (phone: string): boolean => {
  if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidation = (password: string): boolean => {
  //영문 대소문자, 숫자, 특수문자, 길이(4~20)
  if (
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{3,20}$/.test(
      password,
    )
  ) {
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

export const failEdit = () => {
  Alert.alert('요청 오류', '회원정보수정에 실패했습니다. 다시 시도해주세요.', [{text: '확인'}]);
}

export const SuccessEdit = () => {
  Alert.alert('수정 성공', '회원정보가 정상적으로 수정되었습니다.', [{text: '확인'}]);
}

export const errorOccured = (err:string) => {
  Alert.alert('오류 발생', err, [{text: '확인'}]);
}

export const passwordWrong = () => {
  Alert.alert('비밀번호 불일치', "확인 비밀번호가 일치하지 않습니다.", [{text: '확인'}]);
}

export const failedEdit = () => {
  Alert.alert('빈 칸을 채워주세요', "빈 칸이 존재합니다.", [{text: '확인'}]);
}

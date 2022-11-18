import {Alert} from 'react-native';

export const formIsNotFilled = (): void => {
  Alert.alert('공백이 존재합니다', '학교, 학년, 반을 입력해주세요.', [
    { text: '확인' },
  ]);
};

export const failedFetchSchoolId = (): void => {
  Alert.alert('학교 검색', '학교 정보를 다시 확인해주세요.', [
    { text: '확인' },
  ]);
};

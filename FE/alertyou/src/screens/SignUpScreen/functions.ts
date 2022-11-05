import {Alert} from 'react-native';

export const formIsNotFilled = (): void => {
  Alert.alert('실패', '학교, 학년, 반을 입력해주세요.', [{text: '확인'}]);
};

export const failedFetchSchoolId = (): void => {
  Alert.alert('실패', '학교 등록에 실패했습니다. 다시 시도해주세요.', [{text: '확인'}]);
};

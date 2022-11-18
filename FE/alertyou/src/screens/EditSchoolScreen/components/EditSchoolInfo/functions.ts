import { Alert } from "react-native";

export const failedFetchGrade = (): void => {
    Alert.alert('오류 발생', '학교 상세 정보를 불러올 수 없습니다.', [{text: '확인'}]);
};
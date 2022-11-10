import { Alert } from "react-native";

export const failedFetchGrade = (): void => {
    Alert.alert('실패', '학교 정보를 불러올 수 없습니다.', [{text: '확인'}]);
};
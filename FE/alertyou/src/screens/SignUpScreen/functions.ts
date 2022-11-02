import { Alert } from "react-native";

export const formIsNotFilled = (): void => {
   Alert.alert('실패', '학교, 학년, 반을 입력해주세요.', [{text: '확인'}]);
}
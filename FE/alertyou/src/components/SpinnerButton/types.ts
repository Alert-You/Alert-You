import { GestureResponderEvent } from "react-native";

export interface Props {
  onPress: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  height?: number;
  fontSize?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}
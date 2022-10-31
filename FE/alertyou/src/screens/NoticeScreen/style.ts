import { RED, MAIN } from "@/theme/colorVariants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RED.redBg,
  },
  readContainer: {
    textAlign: 'right',
    marginVertical: 12,
    marginRight: 16,
    color: MAIN.mainFont,
    fontSize: 12,
  },
  textContainer: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 15,
    color: MAIN.mainFont,
  }
});
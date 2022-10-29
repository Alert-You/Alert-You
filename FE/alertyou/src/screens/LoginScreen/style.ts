import { MAIN } from "@/theme/colorVariants";
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: MAIN.red,
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    borderRadius: 5
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: FONT_WEIGHT.SemiBold,
    
  }
})
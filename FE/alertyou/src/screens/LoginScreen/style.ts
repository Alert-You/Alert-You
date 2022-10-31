import { MAIN, WHITE } from "@/theme/colorVariants";
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  imageContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 3,
    marginTop: 50,
    marginHorizontal: 16,
  },
  signUpText: {
    textAlign: "center",
    fontSize: 12,
  },
  signUpNavigator: {
    fontSize: 12,
    marginLeft: 4,
    textDecorationLine: "underline",
    fontWeight: FONT_WEIGHT.Bold,
  },
  signUpTextGroup: {
    marginTop: 7,
    justifyContent: "center",
    flexDirection: "row",
  }
});
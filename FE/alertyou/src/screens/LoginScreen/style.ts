import { MAIN, WHITE } from "@/theme/colorVariants";
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  loginButton: {
    marginTop: 32,
    backgroundColor: MAIN.red,
    justifyContent: 'center',
    alignContent: 'center',
    height: 45,
    borderRadius: 5,
    fontWeight: FONT_WEIGHT.Bold,
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.SemiBold,
    color: WHITE.white,
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  formContainer: {
    flex: 3,
    marginTop: 40,
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
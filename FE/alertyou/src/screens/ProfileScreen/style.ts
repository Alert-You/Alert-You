import { Dimensions, StyleSheet } from "react-native";
import { WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white
  },
  headerText: {
    color: WHITE.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.SemiBold,
    marginTop: 10,
  },
  nameText: {
    color: WHITE.white,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.Bold,
    marginTop: 50,
  },
  profileContainer: {
    flex: 1,
    height: "100%",
  },
  profileAbsoluteBox: {
    left: 16,
    bottom: 135,
  }

  
})
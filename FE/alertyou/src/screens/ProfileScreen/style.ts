import { Dimensions, StyleSheet } from "react-native";
import { MAIN, RED, WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white
  },
  teacherScreenContainer: {
    flex: 1,
    backgroundColor: RED.redBg
  },
  headerText: {
    color: WHITE.white,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.Bold,
    marginTop: 15,
  },
  nameText: {
    color: WHITE.white,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.Bold,
    marginTop: 30,
  },
  profileContainer: {
    flex: 1,
    height: "100%",
  },
  profileAbsoluteBox: {
    left: 16,
    bottom: 135,
  },
  studentListButton: {
    marginTop: 100,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 3,
    marginBottom: 5,
    fontWeight: FONT_WEIGHT.Medium
  },
  selectBoxGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectBox: {
    margin: 8,
  },
  countBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countText: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: FONT_WEIGHT.Regular,
    color: MAIN.mainFont,
  },
  selectText: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.Regular,
    color: MAIN.mainFont,
  }
})
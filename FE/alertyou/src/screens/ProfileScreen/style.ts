import { Dimensions, StyleSheet } from "react-native";
import { MAIN, RED, WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from "@/theme/fontWeightVariants";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  teacherScreenContainer: {
    flex: 1,
    backgroundColor: RED.redBg,
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
    height: '100%',
  },
  profileAbsoluteBox: {
    left: 16,
    bottom: 135,
  },
  profileBox: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  studentListButton: {
    marginTop: 100,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 3,
    marginBottom: 5,
    fontWeight: FONT_WEIGHT.Medium,
  },
  selectBoxGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectBox: {
    margin: 8,
  },
  countBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  arrowBox: {
    color: MAIN.red,
  },
  headerBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: RED.redBg,
    marginVertical: 16,
    marginHorizontal: 16,
    zIndex: 1,
  },
  textBox: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Bold,
    color: MAIN.mainFont,
    paddingTop: 4,
  },
  dotContainer: {
    position: 'absolute',
    right: 0,
    top: 26,
    width: Dimensions.get('window').width - 250,
    elevation: 6,
    backgroundColor: WHITE.white,
    height: 60,
    borderRadius: 4,
    zIndex: 2,
  },
  dotContent: {
    margin: 4,
    marginLeft: 8,
  },
  guardText: {
    fontSize: 15,
    color: MAIN.mainFont,
  },
  excludeText: {
    fontSize: 15,
    color: RED.red700,
  },
  tabBoxGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 32,
  },
  tabBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    marginVertical: 12,
  },
  tabText: {
    fontSize: 17,
    color: MAIN.mainFont,
    marginBottom: 12,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.SemiBold,
    color: 'red'
  },
  logoutButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
});
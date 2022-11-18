import { RED, MAIN, WHITE, BLUE, BLACK, NAVY } from "@/theme/colorVariants";
import { StyleSheet } from "react-native";
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';
import { W } from "@/constants/dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  readContainer: {
    textAlign: 'right',
    marginVertical: 10,
    fontWeight: FONT_WEIGHT.SemiBold,
    marginRight: 5,
    color: BLACK.black,
    fontSize: 14,
  },
  textContainer: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 15,
    color: MAIN.mainFont,
  },
  arrowBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginHorizontal: 16,
    marginVertical: 14,
    color: MAIN.mainFont,
  },
  headerBox: {
    position: 'relative',
    // display: 'flex',
    // flexDirection: 'row',
    backgroundColor: WHITE.white,
  },
  textBox: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Bold,
    color: MAIN.mainFont,
  },
  circleBox: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    top: 24,
    zIndex: 1,
  },
  closeText: {
    color: MAIN.red,
    fontSize: 15,
    fontWeight: FONT_WEIGHT.Medium,
  },
  modalBox: {
    marginTop: 100,
    marginBottom: 'auto',
  },
  reportBox: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  reportTitle: {
    width: '20%',
    marginHorizontal: 5,
    color: MAIN.mainFont,
    fontWeight: FONT_WEIGHT.Bold,
  },
  reportContent: {
    width: '70%',
    color: MAIN.mainFont,
  },
  readAll: {
    backgroundColor: NAVY.navy400,
    width: W-10,
    marginVertical: 5,
    elevation: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});
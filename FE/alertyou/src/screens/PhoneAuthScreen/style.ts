import { WHITE, MAIN } from '@/theme/colorVariants';
import {FONT_WEIGHT} from '@/theme/fontWeightVariants';
import {StyleSheet} from 'react-native';

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
    marginTop: 40,
    marginHorizontal: 16,
  },
  infoTextContainer: {
    flex: 1,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.Bold,
    color: MAIN.mainFont,
  },
  formsList: {
    flex: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
  },
  toastText: {
    color: WHITE.white,
    fontWeight: FONT_WEIGHT.Bold,
    fontSize: 13,
  },
  spinnerButtonStyle: {
    marginTop: 32,
  },
});


import { MAIN, WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
});

import {WHITE} from '@/theme/colorVariants';
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
    marginTop: 50,
    marginHorizontal: 16,
  },
  signUpText: {
    marginTop: 3,
    textAlign: 'center',
    fontSize: 14,
  },
  signUpNavigator: {
    marginTop: 3,
    fontSize: 14,
    marginLeft: 4,
    textDecorationLine: 'underline',
    fontWeight: FONT_WEIGHT.Bold,
  },
  signUpTextGroup: {
    marginTop: 7,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  spinnerButtonStyle: {
    marginTop: 32
  }
});

import { StyleSheet } from 'react-native';
import { WHITE, BLACK } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: WHITE.white,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: FONT_WEIGHT.Bold,
    color: BLACK.black
  }
})
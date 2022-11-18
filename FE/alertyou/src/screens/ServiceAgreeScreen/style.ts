import { StyleSheet } from 'react-native';
import { WHITE, BLACK, MAIN } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: FONT_WEIGHT.Bold,
    color: BLACK.black,
    marginVertical: 16,
  },
  contents: {
    fontSize: 16,
    color: BLACK.black,
    lineHeight: 32,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.Bold,
    color: BLACK.black,
    marginVertical: 16,
  },
  listContents: {
    fontSize: 16,
    color: BLACK.black,
    lineHeight: 32,
    marginVertical: 3,
    marginLeft: 4,
  },
  smallListContents: {
    fontSize: 16,
    color: BLACK.black,
    lineHeight: 32,
    marginLeft: 32,
    marginVertical: 3,
  },
});
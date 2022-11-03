
import { WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    elevation: 6,
    height: 205,
    backgroundColor: WHITE.white,
    borderRadius: 10,
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 18,
  },
  contentTitleText: {
    marginLeft: 7,
    fontSize: 20,
    fontWeight: FONT_WEIGHT.SemiBold,
    marginBottom: 2
  },
  contentText: {
    marginLeft: 7,
    fontSize: 14,
    fontWeight: FONT_WEIGHT.Medium
  },
});
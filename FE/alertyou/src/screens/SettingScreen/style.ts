import { StyleSheet } from 'react-native';

import { MAIN, WHITE } from '@/theme/colorVariants';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white
  },
  category: {
    paddingVertical: 15
  },
  categoryTitle: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    
  },
  categoryItem: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  categoryText: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.Bold,
    color: MAIN.mainFont
  }
})
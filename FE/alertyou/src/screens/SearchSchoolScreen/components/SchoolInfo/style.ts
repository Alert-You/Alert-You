import {BLUE, GREY, MAIN, RED, WHITE} from '@/theme/colorVariants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    backgroundColor: WHITE.white200,
    marginBottom: 3,
    height: 65,
    width: '100%',
    justifyContent: 'center',
  },
  schoolText: {
    fontSize: 12,
    marginLeft: 4,
    color: MAIN.mainFont,
    fontWeight: 'bold',
  },
});

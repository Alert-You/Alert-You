import {BLUE, GREY, MAIN, RED, WHITE} from '@/theme/colorVariants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  schoolText: {
    fontSize: 15,
    marginLeft: 6,
    color: MAIN.mainFont,
    fontWeight: 'bold',
  },
  schoolAddress: {
    fontSize: 12,
    marginLeft: 4,
    color: MAIN.mainFont,
    fontWeight: 'bold',
  },
  selectButton: {
    flex: 1,
  },
});

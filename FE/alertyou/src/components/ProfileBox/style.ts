
import { WHITE } from '@/theme/colorVariants';
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
  contentText: {
    marginLeft: 7,
    fontSize: 20,
  },
});
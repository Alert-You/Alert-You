
import { WHITE } from '@/theme/colorVariants';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width-32,
    elevation: 6,
    height: 205,
    backgroundColor: WHITE.white,
    padding: 22,
    borderRadius: 10
  }
})
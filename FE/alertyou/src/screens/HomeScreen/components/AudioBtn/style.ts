import { StyleSheet } from 'react-native';
import { W } from '@/constants/dimensions';

const DIAMETER = W * 0.2;

export const styles = StyleSheet.create({
  btnContainer: {
    width: DIAMETER,
    height: DIAMETER,
    margin: 10,
  },

  btn: {
    width: '100%',
    height: '100%',
  },
});

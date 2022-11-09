import {Dimensions, StyleSheet} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const DIAMETER = WIDTH * 0.2;

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

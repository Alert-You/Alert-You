import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    height: Dimensions.get('window').height,
  },
});

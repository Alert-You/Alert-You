import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    minHeight: Dimensions.get('window').height,
    padding: 16,
    paddingTop: 64,
  },

  mainBtn: {
    elevation: 3,
  },
});

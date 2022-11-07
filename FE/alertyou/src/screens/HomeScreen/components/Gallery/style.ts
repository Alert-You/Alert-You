import {Dimensions, StyleSheet} from 'react-native';

const W = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },

  image: {
    width: (W * 0.98) / 3,
    height: (W * 0.98) / 3,
    marginRight: W * 0.01,
    marginBottom: W * 0.01,
  },
});

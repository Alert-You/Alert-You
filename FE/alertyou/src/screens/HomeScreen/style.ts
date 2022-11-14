import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: Dimensions.get('window').height - 60,
    paddingHorizontal: 16,
  },

  mainTitle: {
    marginTop: 40,
    paddingTop: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

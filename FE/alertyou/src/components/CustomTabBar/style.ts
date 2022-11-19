import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 9,
  },
  centerIcon: {
    bottom: 15,
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    elevation: 8,
  },
});

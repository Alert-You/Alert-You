import { Dimensions, StyleSheet } from 'react-native';

const diameter = 80;

export const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: Dimensions.get('window').height / 30,
    width: diameter,
    height: diameter,
    left: Dimensions.get('window').width / 2 - diameter / 2,
  },
  cameraButton: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10000,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: diameter / 7,
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  previewImage: {
    width: '100%',
    height: '100%',
    borderColor: 'red',
    borderBottomWidth: 10,
    backgroundColor: 'white',
  },

  reportButton: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10000,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: diameter / 20,
  },
});

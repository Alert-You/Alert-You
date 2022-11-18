import { StyleSheet } from 'react-native';
import { W, H } from '@/constants/dimensions';
import HomeScreen from '../../HomeScreen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    height: 0.3 * H,
    maxWidth: W,
  },
  innerContainer: {
    flex: 1,
    width: W,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: H * 0.1,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btnWrapper: {
    flexDirection: 'row',
    paddingTop: H * 0.05,
  },
  counterTxt: {
    textAlign: 'center',
    fontSize: 50,
    width: '100%',
    color: 'white',
    paddingTop: 40,
  },
  viewBarWrapper: {
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 8,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 8,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
});

import { StyleSheet } from 'react-native';
import { W, H } from '@/constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: W,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingTop: H * 0.1,
  },
  viewRecorder: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btnWrapper: {
    flexDirection: 'row',
    paddingTop: H * 0.1,
  },
  counterTxt: {
    textAlign: 'center',
    fontSize: 50,
    width: '100%',
    color: 'white',
    paddingTop: 40,
  },

  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginHorizontal: 28,
    marginBottom: 0,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
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

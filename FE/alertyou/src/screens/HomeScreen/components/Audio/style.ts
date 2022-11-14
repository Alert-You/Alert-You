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
  titleTxt: {
    color: 'white',
    fontSize: 50,
    paddingTop: H * 0.1,
  },
  viewRecorder: {
    marginTop: 40,
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
    fontSize: 80,
    width: '100%',
    color: 'white',
    paddingTop: 80,
  },

  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginHorizontal: 28,
    marginBottom: 40,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
});

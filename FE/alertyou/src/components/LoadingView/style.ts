import { StyleSheet } from 'react-native';
import { W, H } from '@/constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    width: W,
    height: H,
    top: 0,
    left: 0,
  },

  background: {
    position: 'absolute',
    width: W,
    height: H,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 100,
  },

  loadingContent: {
    width: W,
    height: H,
    backgroundColor: 'transparent',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});

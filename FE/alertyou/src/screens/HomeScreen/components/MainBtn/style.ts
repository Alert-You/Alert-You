import { StyleSheet } from 'react-native';
import { H } from '@/constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    minHeight: H,
    padding: 16,
    paddingTop: 64,
  },

  mainBtn: {
    elevation: 3,
  },
});

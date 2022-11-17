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

  innerLine: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
  },

  outerLine: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
});

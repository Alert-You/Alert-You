import { StyleSheet } from 'react-native';
import { H } from '@/constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: H - 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  mainTitle: {
    marginTop: 40,
    paddingTop: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

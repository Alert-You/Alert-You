import {WHITE} from '@/theme/colorVariants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE.white,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  schoolListContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'center'
  },
  scrollViewContainer: {
    flex: 1
  }
});

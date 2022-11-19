import { StyleSheet } from 'react-native';
import { W } from '@/constants/dimensions';
import { emergencyColor } from '@/theme/Home/gradient';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 48,
    paddingVertical: 24,
    maxWidth: W - 32,
    borderRadius: 12,
    borderColor: emergencyColor.light,
    borderWidth: 1,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

import Lottie from 'lottie-react-native';
import { Text } from 'react-native';
import { View } from 'native-base';
import { styles } from './style';

const LoadingView = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.background}>
          <Text></Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.loadingContent}>
          <View width="90%" height="90%">
            <Lottie
              source={require('@/assets/lottie/loading')}
              autoPlay
              loop={true}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default LoadingView;

import {View} from 'react-native';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';

const SplashScreen = () => {
  useEffect(() => {}, []);
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Lottie
        source={require('@/assets/lottie.json')}
        autoPlay
        loop={true}
      />
    </View>
  );
};

export default SplashScreen;

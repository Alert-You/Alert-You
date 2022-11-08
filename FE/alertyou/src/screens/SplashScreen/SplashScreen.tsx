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
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('@assets/ring.json')}
        autoPlay
        loop={true}
      />
    </View>
  );
};

export default SplashScreen;

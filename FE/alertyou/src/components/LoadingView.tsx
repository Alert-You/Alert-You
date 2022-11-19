import {Center, View} from 'native-base';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

const LoadingView = () => {
  return (
    <View style={ContainerStyle}>
      <Center>Loading...</Center>
    </View>
  );
};

export default LoadingView;

const ContainerStyle: StyleProp<ViewStyle> = {
  flex: 1,
  backgroundColor: 'lightGrey',
  justifyContent: 'center',
  alignItems: 'center',
};

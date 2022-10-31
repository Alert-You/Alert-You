import {View, Text} from 'react-native';
import React from 'react';
import {Box, Center} from 'native-base';
import linearGradient from 'react-native-linear-gradient';

type Props = {
  navigation: any;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <Box
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        p="12"
        rounded="xl"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          textAlign: 'center',
        }}>
        This is a Box with Linear Gradient
      </Box>
    </>
  );
};

export default HomeScreen;

import { Text, Dimensions } from 'react-native'
import React from 'react'
import { Box } from 'native-base';
import { BLUE } from '@/theme/colorVariants';

import { styles } from './style';

type Props = {}

const ToastView = (props: Props) => {
  return (
    <Box
      bg={BLUE.blue500}
      shadow={3}
      px="2"
      py="1"
      w={Dimensions.get('window').width - 120}
      h="35"
      rounded="40"
      mb={4}
      fontSize={40}
      alignItems="center"
      justifyContent="center">
      <Text style={styles.toastText}>인증번호가 전송되었습니다</Text>
    </Box>
  );
}

export default ToastView
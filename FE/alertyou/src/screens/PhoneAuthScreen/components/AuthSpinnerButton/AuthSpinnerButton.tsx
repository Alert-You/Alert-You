import { View, Text, TouchableOpacity } from 'react-native'
import React, { Suspense } from 'react'
import { Spinner } from 'native-base';
import { styles } from './style';
import { WHITE } from '@/theme/colorVariants';
import { Props } from './types';

const AuthSpinnerButton = ({children, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      activeOpacity={0.8}
      onPress={onPress}>
      <Suspense fallback={<Spinner color={WHITE.white} />}>
        <Text style={styles.loginButtonText}>{children}</Text>
      </Suspense>
    </TouchableOpacity>
  );
}

export default AuthSpinnerButton
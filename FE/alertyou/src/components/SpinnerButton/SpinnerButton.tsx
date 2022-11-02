import {Text, TouchableOpacity} from 'react-native';
import React, { Suspense } from 'react';

import { Spinner } from 'native-base';
import { WHITE } from '@/theme/colorVariants';

import {Props} from './types';
import { styles } from './style';

const SpinnerButton = (props: Props) => {
  const {onPress, children} = props;

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
};

export default SpinnerButton;

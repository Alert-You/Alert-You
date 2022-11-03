import {Text, TouchableOpacity} from 'react-native';
import React, {Suspense} from 'react';

import {Spinner} from 'native-base';
import {WHITE} from '@/theme/colorVariants';

import {Props} from './types';
import {styles} from './style';

const SpinnerButton = (props: Props) => {
  const {onPress, children, height = 45, fontSize=16} = props;

  return (
    <TouchableOpacity
      style={[styles.loginButton, {height}]}
      activeOpacity={0.8}
      onPress={onPress}>
      <Suspense fallback={<Spinner color={WHITE.white}/>}>
        <Text style={[styles.loginButtonText, {fontSize}]}>{children}</Text>
      </Suspense>
    </TouchableOpacity>
  );
};

export default SpinnerButton;

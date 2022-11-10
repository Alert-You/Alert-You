import {Text, TouchableOpacity} from 'react-native';
import React, {Suspense} from 'react';

import {Spinner} from 'native-base';
import {WHITE} from '@/theme/colorVariants';

import {Props} from './types';
import {styles} from './style';

const SpinnerButton = (props: Props) => {
  const {
    onPress,
    children,
    height = 45,
    fontSize = 16,
    isLoading = false,
    isDisabled = false
  } = props;

  return (
    <TouchableOpacity
      style={[styles.loginButton, {height}]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      >
      <Suspense fallback={<Spinner color={WHITE.white} />}>
        {!isLoading ? (
          <Text style={[styles.loginButtonText, {fontSize}]}>{children}</Text>
        ) : (
          <Spinner color={WHITE.white} size="md"/>
        )}
      </Suspense>
    </TouchableOpacity>
  );
};

export default SpinnerButton;

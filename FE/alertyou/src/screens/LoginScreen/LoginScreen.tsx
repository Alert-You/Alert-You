import {View, Button, Text} from 'react-native';
import {
  CloseIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Stack,
} from 'native-base';
import React, {useReducer} from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {useSetRecoilState} from 'recoil';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MAIN} from '@/theme/colorVariants';
import {tokenState} from '@/store';
import {LogoImage, SpinnerButton} from '@/components';

import {styles} from './style';
import {
  failPhoneValidation,
  loginInitialState,
  loginReducer,
  onFailHandler,
  phoneValidation,
  saveToken,
} from './functions';
import {loginRequest} from './apis';
import {loginValueType, TokenType} from './types';

const LoginScreen = ({navigation}: any) => {
  const setToken = useSetRecoilState(tokenState);
  //onSuccess 데이터 처리, alert스타일 처리
  const {data, mutate, isLoading} = useMutation<
    TokenType,
    unknown,
    loginValueType
  >(credentials => loginRequest(credentials), {
    onSuccess: successData => {
      setToken(successData.data.tokenId);
      saveToken(successData.data.tokenId);
    },
    onError: () => {
      //실패해도 성공에서 fail메세지를 받나?
      onFailHandler();
    },
  });
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);
  const createTmpToken = () => {
    setToken('1');
  };

  const changePhoneNumber = (e: string): void => {
    dispatch({type: 'phone', payload: e});
  };

  const changePassword = (e: string): void => {
    dispatch({type: 'password', payload: e});
  };

  const deletePhoneNumber = (): void => {
    dispatch({type: 'phone', payload: ''});
  };

  const deletePassword = (): void => {
    dispatch({type: 'password', payload: ''});
  };

  const submitAndClearForm = () => {
    //유효성 검사 추가
    if (phoneValidation(state.phone)) {
      mutate(state);
      //Navigate로 홈으로 이동
    } else if (!state.phone || !state.password) {
      onFailHandler();
    } else {
      failPhoneValidation();
    }
    deletePhoneNumber();
    deletePassword();
  };

  const moveToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ErrorBoundary>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.imageContainer}>
          <LogoImage />
        </View>
        <View style={styles.formContainer}>
          <Stack space={4}>
            <FormControl isRequired>
              <FormControl.Label>휴대폰 번호</FormControl.Label>
              <Input
                variant="underlined"
                placeholder="010xxxx0000"
                keyboardType="numeric"
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={deletePhoneNumber}>
                    {state.phone ? <CloseIcon color={MAIN.red} /> : null}
                  </Pressable>
                }
                onChangeText={changePhoneNumber}
                autoCorrect={false}
                value={state.phone}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>비밀번호</FormControl.Label>
              <Input
                type="password"
                variant="underlined"
                placeholder="비밀번호"
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={deletePassword}>
                    {state.password ? <CloseIcon color={MAIN.red} /> : null}
                  </Pressable>
                }
                onChangeText={changePassword}
                autoCorrect={false}
                value={state.password}
              />
            </FormControl>
          </Stack>
          <View style={styles.spinnerButtonStyle}>
            <SpinnerButton onPress={isLoading ? () => {} : submitAndClearForm}>
              로그인
            </SpinnerButton>
          </View>
          <View style={styles.signUpTextGroup}>
            <Text style={styles.signUpText}>알럿유가 처음이신가요?</Text>
            <Text style={styles.signUpNavigator} onPress={moveToSignUp}>
              회원가입
            </Text>
          </View>
          <Button title="토큰부여" onPress={createTmpToken} />
        </View>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
};

export default LoginScreen;

import {View, Button, TouchableOpacity, Text} from 'react-native';
import {
  CloseIcon,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Spinner,
  Stack,
} from 'native-base';
import ErrorBoundary from 'react-native-error-boundary';
import React, {Suspense, useReducer} from 'react';
import {tokenState} from '@/store';
import {useSetRecoilState} from 'recoil';
import {MAIN, WHITE} from '@/theme/colorVariants';
import {LogoImage} from '@/components';
import {useMutation} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from './style';
import {
  failPhoneValidation,
  loginInitialState,
  loginReducer,
  onFailHandler,
  phoneValidation,
} from './functions';
import {loginRequest} from './apis';
import {loginValueType, TokenType} from './types';
import SignUpNavigation from '../../navigations/SignUpNavigation/SignUpNavigation';

const LoginScreen = ({navigation}: any) => {
  const setToken = useSetRecoilState(tokenState);
  //onSuccess 데이터 처리, alert스타일 처리
  const {data, mutate} = useMutation<TokenType, unknown, loginValueType>(
    credentials => loginRequest(credentials),
    {
      onSuccess: successData => {
        setToken(successData.data.tokenId);
        async () => {
          try {
            await AsyncStorage.setItem('@token', successData.data.tokenId);
          } catch {
            console.log('기기에 토큰 저장 실패');
          }
        };
      },
      onError: () => {
        //실패해도 성공에서 fail메세지를 받나?
        onFailHandler();
      },
    },
  );
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
    } else if(!state.phone || !state.password) {
      onFailHandler()
    } else {
      failPhoneValidation();
    }
    deletePhoneNumber();
    deletePassword();
  };
  
  const moveToSignUp = () => {
    navigation.navigate("SignUp")
  }

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
                    {state.phone && <CloseIcon color={MAIN.red} />}
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
                    {state.password && <CloseIcon color={MAIN.red} />}
                  </Pressable>
                }
                onChangeText={changePassword}
                autoCorrect={false}
                value={state.password}
              />
            </FormControl>
          </Stack>
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={submitAndClearForm}>
            <Suspense fallback={<Spinner color={WHITE.white} />}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </Suspense>
          </TouchableOpacity>
          <View style={styles.signUpTextGroup}>
            <Text style={styles.signUpText}>
              알럿유가 처음이신가요?
            </Text>
              <Text style={styles.signUpNavigator} onPress={moveToSignUp}>회원가입</Text>
          </View>
          <Button title="토큰부여" onPress={createTmpToken} />
        </View>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  );
};

export default LoginScreen;

import {View, Button, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {CloseIcon, FormControl, Input, Pressable, Stack} from 'native-base';
import React, {useReducer} from 'react';
import {tokenState} from '@/store';
import {useSetRecoilState} from 'recoil';
import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {loginInitialState, loginReducer} from './functions';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const setTmpToken = useSetRecoilState(tokenState);
  const [state, dispatch] = useReducer(loginReducer, loginInitialState);

  const createTmpToken = () => {
    setTmpToken('1');
  };

  const changePhoneNumber = (e: string): void => {
    dispatch({type: 'phoneNumber', payload: e});
  };

  const changePassword = (e: string): void => {
    dispatch({type: 'password', payload: e});
  };

  const deletePhoneNumber = (): void => {
    dispatch({type: 'phoneNumber', payload: ''});
  };

  const deletePassword = (): void => {
    dispatch({type: 'password', payload: ''});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormControl isRequired>
        <Stack space={4}>
          <Input
            variant="underlined"
            placeholder="휴대폰 번호"
            keyboardType="numeric"
            size="sm"
            color={MAIN.mainFont}
            focusOutlineColor={MAIN.red}
            InputRightElement={
              <Pressable onPress={deletePhoneNumber}>
                {state.phoneNumber && <CloseIcon color={MAIN.red} />}
              </Pressable>
            }
            onChangeText={changePhoneNumber}
            value={state.phoneNumber}
          />
          <Input
            type="password"
            variant="underlined"
            placeholder="비밀번호"
            size="sm"
            color={MAIN.mainFont}
            focusOutlineColor={MAIN.red}
            InputRightElement={
              <Pressable onPress={deletePassword}>
                {state.password && <CloseIcon color={MAIN.red} />}
              </Pressable>
            }
            onChangeText={changePassword}
            value={state.password}
          />
          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </Stack>
      </FormControl>
      <Button title="토큰부여" onPress={createTmpToken} />
    </SafeAreaView>
  );
};

export default LoginScreen;

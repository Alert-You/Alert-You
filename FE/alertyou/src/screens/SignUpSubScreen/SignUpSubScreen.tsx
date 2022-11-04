import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  CloseIcon,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import {useRecoilState} from 'recoil';

import {LogoImage, SpinnerButton} from '@/components';
import {MAIN} from '@/theme/colorVariants';
import {accountState} from '@/store/signUpState';

import {passwordValidation} from './functions';
import {styles} from './style';

const SignUpSubScreen = ({navigation}: any) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [account, setAccount] = useRecoilState(accountState);

  const changeName = (e: string): void => {
    setAccount(state => {
      return {...state, name: e.trim()};
    });
  };

  const changePassword = (e: string): void => {
    setAccount(state => {
      return {...state, password: e.trim()};
    });
  };

  const deleteName = (): void => {
    setAccount(state => {
      return {...state, name: ''};
    });
  };

  const deletePassword = (): void => {
    setAccount(state => {
      return {...state, password: ''};
    });
  };

  const submitForm = (): void => {
    if (passwordValidation(account.password)) {
      setIsValid(false);
      navigation.navigate('SignUp', {
        screen: 'PhoneAuthScreen',
      });
    } else {
      setIsValid(true);
      setAccount(state => {
        return {...state, password: ''};
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoImage />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>계정 정보를 입력하세요.</Text>
        </View>
        <View style={styles.formsList}>
          <Stack space={4}>
            <FormControl isRequired>
              <FormControl.Label>이름</FormControl.Label>
              <Input
                type="text"
                variant="underlined"
                placeholder="ex) 홍길동"
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={deleteName}>
                    {account.name ? <CloseIcon color={MAIN.red} /> : null}
                  </Pressable>
                }
                onChangeText={changeName}
                autoCorrect={false}
                value={account.name}
              />
            </FormControl>
            <FormControl isRequired isInvalid={isValid}>
              <FormControl.Label>비밀번호</FormControl.Label>
              <Input
                type="password"
                variant="underlined"
                placeholder="숫자, 영어 소문자, 대문자, 특수문자를 입력하세요."
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={deletePassword}>
                    {account.password ? <CloseIcon color={MAIN.red} /> : null}
                  </Pressable>
                }
                onChangeText={changePassword}
                autoCorrect={false}
                value={account.password}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="sm" />}>
                4~20자, 영문 대소문자, 숫자, 특수문자를 포함하세요.
              </FormControl.ErrorMessage>
            </FormControl>
          </Stack>
          <View style={styles.spinnerButtonStyle}>
            <SpinnerButton onPress={submitForm}>다음</SpinnerButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpSubScreen;

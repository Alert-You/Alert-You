import {View, Text, Pressable, Keyboard} from 'react-native';
import React, {Suspense, useState} from 'react';
import {
  CheckIcon,
  CloseIcon,
  FormControl,
  Input,
  Stack,
  useToast,
} from 'native-base';
import {useRecoilState, useRecoilValue} from 'recoil';
import {MutationObserver, useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {LogoImage, SpinnerButton} from '@/components';
import {phoneState, signUpState, signUpType} from '@/store/signUpState';
import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {AuthSpinnerButton, ToastView} from './components';
import {
  onFailHandler,
  phoneValidation,
  onVerifySuccess,
  onVerifyFail,
  failSignUp,
  errorOccured,
} from './functions';
import {fetchAuthKey, reqeustSignUp} from './apis';
import {signUpResponseType, verifyResponseType} from './types';
import { useLogIn } from '@/hooks';

const PhoneAuthScreen = ({navigation}: any) => {
  const [phone, setPhone] = useRecoilState(phoneState);
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>('');
  const [allowSignUp, setAllowSignUp] = useState<boolean>(false);
  const signUpValue = useRecoilValue(signUpState);
  const toast = useToast();

  const loginMutate = useLogIn();
  //타입은 <데이터, 에러, 변수>
  const verifyMutate = useMutation<verifyResponseType, AxiosError, string>(
    state => fetchAuthKey(state),
    {
      onSuccess: () => {
        onSuccessToast();
        setOpenInput(true);
      },
    },
  );

  const signUpMutate = useMutation<signUpResponseType, AxiosError, signUpType>(
    credentials => reqeustSignUp(credentials),
    {
      onSuccess: () => {
        //로그인 및 토큰저장
        loginMutate.mutate({
          phone: signUpValue.phone,
          password: signUpValue.password
        })
      },
      onError: err => {
        errorOccured(err.message);
      },
    },
  );

  const onSuccessToast = (): void => {
    toast.show({
      render: () => {
        return <ToastView />;
      },
      duration: 4000,
    });
  };

  const changePhoneNumber = (e: string): void => {
    setPhone(state => {
      return {phone: e.trim()};
    });
  };

  const changeAuthNumber = (e: string): void => {
    setAuthNumber(e.trim());
  };

  const deletePhoneNumber = (): void => {
    setPhone(state => {
      return {phone: ''};
    });
  };

  const deleteAuthNumber = (): void => {
    setAuthNumber('');
  };

  //휴대폰 형식이 맞는지 확인하고 요청
  const sendAuthMessage = (): void => {
    if (phoneValidation(phone.phone)) {
      //인증 요청
      verifyMutate.mutate(phone.phone);
      Keyboard.dismiss();
    } else {
      onFailHandler();
      deletePhoneNumber();
    }
  };

  //인증번호가 맞는지 체크
  const checkAuthValid = (): void => {
    if (authNumber === verifyMutate.data?.certNumber) {
      setAllowSignUp(true);
      onVerifySuccess();
    } else {
      setAllowSignUp(false);
      onVerifyFail();
    }
  };

  const submitSignUp = (): void => {
    if (allowSignUp) {
      signUpMutate.mutate(signUpValue);
    } else if (!allowSignUp) {
      //회원가입 실패(요청 이후의 알럿으로 분기처리)
      failSignUp();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoImage />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>휴대폰 인증을 진행하세요</Text>
          <Suspense>
            <Text>{verifyMutate?.data?.certNumber}</Text>
          </Suspense>
        </View>
        <View style={styles.formsList}>
          <Stack space={4}>
            <FormControl isRequired>
              <FormControl.Label>휴대폰 번호</FormControl.Label>
              <View style={styles.phoneContainer}>
                <Input
                  variant="underlined"
                  placeholder="010xxxx0000"
                  keyboardType="numeric"
                  size="md"
                  w="75%"
                  h="9"
                  color={MAIN.mainFont}
                  focusOutlineColor={MAIN.red}
                  InputRightElement={
                    <Pressable onPress={deletePhoneNumber}>
                      {phone.phone ? <CloseIcon color={MAIN.red} /> : null}
                    </Pressable>
                  }
                  onChangeText={changePhoneNumber}
                  autoCorrect={false}
                  value={phone.phone}
                />
                <AuthSpinnerButton
                  onPress={verifyMutate.isLoading ? () => {} : sendAuthMessage}>
                  인증 요청
                </AuthSpinnerButton>
              </View>
            </FormControl>
            {openInput ? (
              <FormControl isRequired>
                <View style={styles.phoneContainer}>
                  <Input
                    variant="underlined"
                    placeholder="ex) 12345"
                    keyboardType="numeric"
                    size="md"
                    w="75%"
                    h="9"
                    color={MAIN.mainFont}
                    focusOutlineColor={MAIN.red}
                    InputRightElement={
                      <Pressable onPress={deleteAuthNumber}>
                        {!allowSignUp && authNumber ? (
                          <CloseIcon color={MAIN.red} />
                        ) : null}
                        {allowSignUp ? <CheckIcon color="emerald.500" /> : null}
                      </Pressable>
                    }
                    onChangeText={changeAuthNumber}
                    autoCorrect={false}
                    value={authNumber}
                  />
                  <AuthSpinnerButton onPress={checkAuthValid}>
                    인증
                  </AuthSpinnerButton>
                </View>
              </FormControl>
            ) : null}
          </Stack>
          <View style={styles.spinnerButtonStyle}>
            <SpinnerButton onPress={submitSignUp}>회원가입</SpinnerButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhoneAuthScreen;

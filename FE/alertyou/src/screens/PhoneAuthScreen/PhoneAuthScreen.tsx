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
import {useRecoilState} from 'recoil';
import {useMutation} from '@tanstack/react-query';

import {LogoImage, SpinnerButton} from '@/components';
import {phoneState} from '@/store/signUpState';
import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {AuthSpinnerButton, ToastView} from './components';
import {
  onFailHandler,
  phoneValidation,
  onVerifySuccess,
  onVerifyFail,
  failSignUp,
} from './functions';
import {fetchAuthKey} from './apis';

const PhoneAuthScreen = ({navigation}: any) => {
  //타입 지정
  const {data, mutate, isLoading} = useMutation<any, unknown, any>(state =>
    fetchAuthKey(state),
    );

  const [phone, setPhone] = useRecoilState(phoneState);
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>('');
  const [allowSignUp, setAllowSignUp] = useState<boolean>(false);
  const toast = useToast();

  const onSuccessHandler = (): void => {
    toast.show({
      render: () => {
        return <ToastView />;
      },
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

  const sendAuthMessage = (): void => {
    if (phoneValidation(phone.phone)) {
      //인증 요청
      mutate(phone.phone);
      onSuccessHandler();
      setOpenInput(true);
      Keyboard.dismiss();
    } else {
      onFailHandler();
      deletePhoneNumber();
    }
  };

  const checkAuthValid = (): void => {
    //인증번호가 입력값과 같은지 체크 후 보냄
    if (authNumber === data?.certNumber) {
      setAllowSignUp(true);
      onVerifySuccess();
    } else {
      setAllowSignUp(false);
      onVerifyFail();
    }
  };

  const submitSignUp = (): void => {
    if (allowSignUp) {
      //아예 조건부 렌더링으로 하지 않는게 나은가?
      //토큰이 존재하는데 만료 상태라도 바로 홈으로 진입함.(문제 있음)
      navigation.navigate('Home', {screen: 'HomeScreen'});
      //회원가입 성공, 토큰 생성 및 저장
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
            <Text>{data?.certNumber}</Text>
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
                  onPress={isLoading ? () => {} : sendAuthMessage}>
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

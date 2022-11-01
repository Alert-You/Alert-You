import {View, Text, Pressable, Keyboard, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Box, CloseIcon, FormControl, Input, Stack, useToast} from 'native-base';
import {useRecoilState} from 'recoil';
import {LogoImage, SpinnerButton} from '@/components';
import {BLUE, MAIN, WHITE} from '@/theme/colorVariants';
import {phoneState} from '@/store/signUpState';

import {styles} from './style';
import {AuthSpinnerButton} from './components';
import {onFailHandler, phoneValidation} from './functions';

const PhoneAuthScreen = () => {
  
  const [phone, setPhone] = useRecoilState(phoneState);
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [authNumber, setAuthNumber] = useState<string>('');
  const toast = useToast();

  const onSuccessHandler = (): void => {
    toast.show({
      render: () => {
        return (
          <Box
            bg={BLUE.blue500}
            shadow={3}
            px="2"
            py="1"
            w={Dimensions.get('window').width - 120}
            h="35"
            rounded="40"
            mb={4}
            fontSize={40}
            alignItems="center"
            justifyContent="center">
            <Text style={styles.toastText}>인증번호가 전송되었습니다</Text>
          </Box>
        );
      },
    });
  };

  const changePhoneNumber = (e: string): void => {
    setPhone(state => {
      return {phone: e};
    });
  };

  const changeAuthNumber = (e: string): void => {
    setAuthNumber(e);
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
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoImage />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>휴대폰 인증을 진행하세요</Text>
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
                <AuthSpinnerButton onPress={sendAuthMessage}>
                  인증 요청
                </AuthSpinnerButton>
              </View>
            </FormControl>
            {openInput ? <FormControl isRequired>
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
                    <Pressable onPress={deleteAuthNumber}>
                      {authNumber ? <CloseIcon color={MAIN.red} /> : null}
                    </Pressable>
                  }
                  onChangeText={changeAuthNumber}
                  autoCorrect={false}
                  value={authNumber}
                />
                <AuthSpinnerButton onPress={sendAuthMessage}>
                  인증
                </AuthSpinnerButton>
              </View>
            </FormControl>: null}
          </Stack>
          <SpinnerButton onPress={() => {}}>회원가입</SpinnerButton>
        </View>
      </View>
    </View>
  );
};

export default PhoneAuthScreen;

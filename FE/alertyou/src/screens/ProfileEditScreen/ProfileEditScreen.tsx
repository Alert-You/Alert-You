import {Keyboard, Pressable, View} from 'react-native';
import React, {useReducer, useState} from 'react';
import {
  Stack,
  FormControl,
  Input,
  SearchIcon,
  WarningOutlineIcon,
  CloseIcon,
  useToast,
  CheckIcon,
} from 'native-base';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {BLACK, MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {fetchAuthKey, requestEdit} from './apis';
import {
  editResponseType,
  verifyResponseType,
} from './types';
import {useRecoilState, useRecoilValue} from 'recoil';
import AuthSpinnerButton from '../PhoneAuthScreen/components/AuthSpinnerButton/AuthSpinnerButton';
import {
  editPasswordConfirmState,
  editPasswordState,
  editPhoneState,
  editSchoolIdState,
  editSchoolNameState,
  editUsernameState,
  profileFormState,
  profileFormType,
} from '@/store/profileState';
import {ToastView} from '../PhoneAuthScreen/components';
import {
  failedEdit,
  failEdit,
  onFailHandler,
  onVerifyFail,
  onVerifySuccess,
  passwordValidation,
  passwordWrong,
  phoneValidation,
  SuccessEdit,
} from './functions';
import {SpinnerButton} from '@/components';
import { FONT_WEIGHT } from '@/theme/fontWeightVariants';

const ProfileEditScreen = ({navigation}: any) => {
  const schoolName = useRecoilValue(editSchoolNameState);
  const schoolId = useRecoilValue(editSchoolIdState);
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [username, setUsername] = useRecoilState(editUsernameState);
  const [phone, setPhone] = useRecoilState(editPhoneState);
  const [password, setPassword] = useRecoilState(editPasswordState);
  const [password2, setPassword2] = useRecoilState(editPasswordConfirmState);
  const [authNumber, setAuthNumber] = useState<string>('');
  const [allowSignUp, setAllowSignUp] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isValid2, setIsValid2] = useState<boolean>(false);
  const editProfileCredentials = useRecoilValue(profileFormState);
  const toast = useToast();
  const editMutate = useMutation<editResponseType, AxiosError, profileFormType>(
    state => requestEdit(state),
    {
      onSuccess: () => {
        SuccessEdit();
        navigation.navigate('Profile', {screen: 'ProfileScreen'})
      },
      onError: (err) => {
        failEdit()
      }
    },
  );
  const verifyMutate = useMutation<verifyResponseType, AxiosError, string>(
    state => fetchAuthKey(state),
    {
      onSuccess: () => {
        onSuccessToast();
        setOpenInput(true);
      },
    },
  );

  const onSuccessToast = (): void => {
    toast.show({
      render: () => {
        return <ToastView />;
      },
      duration: 2000,
    });
  };

  const changeUsername = (e: string): void => {
    setUsername(e);
  };

  const changePassword = (e: string): void => {
    if (passwordValidation(password)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    setPassword(e);
  };

  const changePassword2 = (e: string): void => {
    if (passwordValidation(password2)) {
      setIsValid2(false);
    } else {
      setIsValid2(true);
    }

    setPassword2(e);
  };

  const changePhone = (e: string): void => {
    setPhone(e);
  };

  const deleteUsername = (): void => {
    setUsername('');
  };

  const deletePassword = (): void => {
    setPassword('');
  };

  const deletePassword2 = (): void => {
    setPassword2('');
  };

  const changeAuthNumber = (e: string): void => {
    setAuthNumber(e.trim());
  };

  const deletePhone = (): void => {
    setPhone('');
  };

  const deleteAuthNumber = (): void => {
    setAuthNumber('');
  };

  const moveToEditSchool = (): void => {
    navigation.navigate('Profile', {screen: 'EditSchoolScreen'});
  };

  const sendAuthMessage = (): void => {
    if (phoneValidation(phone)) {
      //인증 요청
      verifyMutate.mutate(phone);
      Keyboard.dismiss();
    } else {
      onFailHandler();
      deletePhone();
    }
  };

  const checkAuthValid = (): void => {
    if (authNumber === verifyMutate?.data?.certNumber) {
      setAllowSignUp(true);
      onVerifySuccess();
    } else {
      setAllowSignUp(false);
      onVerifyFail();
    }
  };

  let EDIT_PERMISSION =
    password === password2 &&
    schoolName &&
    phone &&
    username &&
    password &&
    password2 &&
    schoolId &&
    ((openInput && allowSignUp) || !openInput);

  const submitProfileForm = (): void => {
    if (EDIT_PERMISSION) {
      editMutate.mutate(editProfileCredentials)
    } else if (password !== password2) {
      passwordWrong();
    } else {
      failedEdit();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formList}>
        <Stack space={4}>
          <FormControl>
            <FormControl.Label>학교 검색</FormControl.Label>
            <Pressable onPress={moveToEditSchool}>
              <Input
                type="text"
                variant="underlined"
                editable={false}
                placeholder="ex) 싸피고등학교"
                fontWeight={FONT_WEIGHT.SemiBold}
                size="md"
                h="9"
                color={BLACK.black}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={moveToEditSchool}>
                    <SearchIcon size="md" />
                  </Pressable>
                }
                autoCorrect={false}
                value={schoolName}
              />
            </Pressable>
          </FormControl>
          <FormControl>
            <FormControl.Label>이름</FormControl.Label>
            <Input
              type="text"
              variant="underlined"
              placeholder="ex) 홍길동"
              fontWeight={FONT_WEIGHT.SemiBold}
              size="md"
              h="9"
              color={BLACK.black}
              focusOutlineColor={MAIN.red}
              InputRightElement={
                <Pressable onPress={deleteUsername}>
                  {username ? <CloseIcon color={MAIN.red} /> : null}
                </Pressable>
              }
              onChangeText={changeUsername}
              autoCorrect={false}
              value={username}
            />
          </FormControl>
          <FormControl isInvalid={isValid}>
            <FormControl.Label>새 비밀번호</FormControl.Label>
            <Input
              type="password"
              variant="underlined"
              placeholder="숫자, 영어 소문자, 대문자, 특수문자를 포함한 비밀번호"
              fontWeight={FONT_WEIGHT.SemiBold}
              size="md"
              h="9"
              color={BLACK.black}
              focusOutlineColor={MAIN.red}
              InputRightElement={
                <Pressable onPress={deletePassword}>
                  {password ? <CloseIcon color={MAIN.red} /> : null}
                </Pressable>
              }
              onChangeText={changePassword}
              autoCorrect={false}
              value={password}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="sm" />}>
              4~20자, 영문 대소문자, 숫자, 특수문자를 포함하세요.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={isValid2}>
            <FormControl.Label>비밀번호 확인</FormControl.Label>
            <Input
              type="password"
              variant="underlined"
              placeholder="숫자, 영어 소문자, 대문자, 특수문자를 포함한 비밀번호"
              fontWeight={FONT_WEIGHT.SemiBold}
              size="md"
              h="9"
              color={BLACK.black}
              focusOutlineColor={MAIN.red}
              InputRightElement={
                <Pressable onPress={deletePassword2}>
                  {password2 ? <CloseIcon color={MAIN.red} /> : null}
                </Pressable>
              }
              onChangeText={changePassword2}
              autoCorrect={false}
              value={password2}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="sm" />}>
              4~20자, 영문 대소문자, 숫자, 특수문자를 포함하세요.
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>휴대폰 번호</FormControl.Label>
            <View style={styles.phoneContainer}>
              <Input
                variant="underlined"
                placeholder=" - 을 제외한 전화번호"
                keyboardType="numeric"
                fontWeight={FONT_WEIGHT.SemiBold}
                size="md"
                w="75%"
                h="9"
                color={BLACK.black}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={deletePhone}>
                    {phone ? <CloseIcon color={MAIN.red} /> : null}
                  </Pressable>
                }
                onChangeText={changePhone}
                autoCorrect={false}
                value={phone}
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
                  placeholder="ex) 123456"
                  keyboardType="numeric"
                  fontWeight={FONT_WEIGHT.SemiBold}
                  size="md"
                  w="75%"
                  h="9"
                  color={BLACK.black}
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
          <View style={styles.spinnerButtonStyle}>
            <SpinnerButton onPress={submitProfileForm}>수정 완료</SpinnerButton>
          </View>
        </Stack>
      </View>
    </View>
  );
};

export default ProfileEditScreen;

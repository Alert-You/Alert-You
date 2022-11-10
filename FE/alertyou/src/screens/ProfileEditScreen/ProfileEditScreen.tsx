import {Pressable, View} from 'react-native';
import React, {useReducer, useState} from 'react';
import {
  Stack,
  FormControl,
  Input,
  SearchIcon,
  WarningOutlineIcon,
  CloseIcon,
} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import {requestAccountInfo} from './apis';
import {profileResponseType} from './types';
import {useRecoilState} from 'recoil';
import {schoolState} from '@/store/signUpState';
import AuthSpinnerButton from '../PhoneAuthScreen/components/AuthSpinnerButton/AuthSpinnerButton';
import {
  editPasswordState,
  editPhoneState,
  editSchoolIdState,
  editSchoolNameState,
  editUsernameState,
  profileFormState,
} from '@/store/profileState';

const ProfileEditScreen = () => {
  const [schoolName, setSchoolName] = useRecoilState(editSchoolNameState);
  const [username, setUsername] = useRecoilState(editUsernameState);
  const [phone, setPhone] = useRecoilState(editPhoneState);
  const [schoolId, setSchoolId] = useRecoilState(editSchoolIdState);
  const [password, setPassword] = useRecoilState(editPasswordState);
  const [profileForm, setProfileForm] = useRecoilState(profileFormState);
  const userQuery = useQuery<profileResponseType, AxiosError>(
    ['accountInfo'],
    requestAccountInfo,
    {
      suspense: true,
      onSuccess: res => {
        console.log(res);
        setProfileForm({
          username: res.name,
          phone: res.phone,
          schoolId: res.schoolId === parseInt(schoolId) ? res.schoolId : parseInt(schoolId),
          password: '',
        });
        setSchoolName(state => {
          if(res.schoolName !== state) {
            return state
          } else {
            return res.schoolName
          }
        });
      },
    },
  );

  const changeUsername = (e: string): void => {
    setUsername(e);
  };

  const changePassword = (e: string): void => {
    setPassword(e);
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

  const deletePhone = (): void => {
    setPhone('');
  };

  // const sendAuthMessage = (): void => {
  //   if (phoneValidation(.phone)) {
  //     //인증 요청
  //     verifyMutate.mutate(phone.phone);
  //     Keyboard.dismiss();
  //   } else {
  //     onFailHandler();
  //     deletePhoneNumber();
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.formList}>
        <Stack space={4}>
          <FormControl>
            <FormControl.Label>학교 검색</FormControl.Label>
            <Pressable onPress={() => {}}>
              <Input
                type="text"
                variant="underlined"
                editable={false}
                placeholder="ex) 싸피고등학교"
                size="md"
                h="9"
                color={MAIN.mainFont}
                focusOutlineColor={MAIN.red}
                InputRightElement={
                  <Pressable onPress={() => {}}>
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
              size="md"
              h="9"
              color={MAIN.mainFont}
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
          {/* <FormControl isInvalid={isValid}> */}
          <FormControl>
            <FormControl.Label>새 비밀번호</FormControl.Label>
            <Input
              type="password"
              variant="underlined"
              placeholder="숫자, 영어 소문자, 대문자, 특수문자를 포함한 비밀번호"
              size="md"
              h="9"
              color={MAIN.mainFont}
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
          <FormControl isRequired>
            <FormControl.Label>휴대폰 번호</FormControl.Label>
            <View style={styles.phoneContainer}>
              <Input
                variant="underlined"
                placeholder=" - 을 제외한 전화번호"
                keyboardType="numeric"
                size="md"
                w="75%"
                h="9"
                color={MAIN.mainFont}
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
              {/* <AuthSpinnerButton
                onPress={verifyMutate.isLoading ? () => {} : sendAuthMessage}>
                인증 요청
              </AuthSpinnerButton> */}
            </View>
          </FormControl>
          {/* {openInput ? (
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
          ) : null} */}
        </Stack>
      </View>
    </View>
  );
};

export default ProfileEditScreen;

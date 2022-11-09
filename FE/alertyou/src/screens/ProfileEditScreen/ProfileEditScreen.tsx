import {Pressable, View} from 'react-native';
import React from 'react';
import {Stack, FormControl, Input, SearchIcon, WarningOutlineIcon} from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {MAIN} from '@/theme/colorVariants';

import {styles} from './style';
import { requestAccountInfo } from './apis';
import { profileResponseType } from './types';

const ProfileEditScreen = () => {
  const {data} = useQuery<profileResponseType, AxiosError>(["accountInfo"], requestAccountInfo, {
    suspense: true,
    onSuccess: (res) => {
      console.log(res)
    }
  })
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
                value={data?.schoolName}
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
              // InputRightElement={
              //   <Pressable onPress={deleteName}>
              //     {account.username ? <CloseIcon color={MAIN.red} /> : null}
              //   </Pressable>
              // }
              // onChangeText={changeName}
              autoCorrect={false}
              value={data?.name}
            />
          </FormControl>
          {/* <FormControl isInvalid={isValid}> */}
          <FormControl>
            <FormControl.Label>비밀번호</FormControl.Label>
            <Input
              type="password"
              variant="underlined"
              placeholder="숫자, 영어 소문자, 대문자, 특수문자를 포함한 비밀번호"
              size="md"
              h="9"
              color={MAIN.mainFont}
              focusOutlineColor={MAIN.red}
              // InputRightElement={
              // <Pressable onPress={deletePassword}>
              //   {account.password ? <CloseIcon color={MAIN.red} /> : null}
              // </Pressable>
              // }
              // onChangeText={changePassword}
              autoCorrect={false}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="sm" />}>
              4~20자, 영문 대소문자, 숫자, 특수문자를 포함하세요.
            </FormControl.ErrorMessage>
          </FormControl>
        </Stack>
      </View>
    </View>
  );
};

export default ProfileEditScreen;

import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { ChevronRightIcon, Divider, Center } from 'native-base';

import { getToken } from '@/utils/auth';
import { useLogout } from '@/hooks';

import { styles } from './style';
import {
  editPasswordConfirmState,
  editPhoneState,
  editSchoolNameState,
  profileFormState,
} from '@/store/profileState';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { profileResponseType } from './types';
import { AxiosError } from 'axios';
import { requestAccountInfo } from './apis';
import { useIsFocused } from '@react-navigation/native';

const SettingScreen = ({ navigation }: any) => {
  const setProfileForm = useSetRecoilState(profileFormState);
  const setSchoolName = useSetRecoilState(editSchoolNameState);
  const setPassword2 = useSetRecoilState(editPasswordConfirmState);
  const setPhone = useSetRecoilState(editPhoneState);
  const focused = useIsFocused();
  const {refetch} = useQuery<profileResponseType, AxiosError>(
    ['accountInfo'],
    requestAccountInfo,
    {
      suspense: true,
      onSuccess: res => {
        console.log(res);
        setProfileForm({
          username: res.name,
          phone: res.phone,
          schoolId: res.schoolId,
          password: '',
        });
        setPassword2('');
        setSchoolName(res.schoolName);
        setPhone(res.phone);
      },
      refetchOnMount: true,
    },
    );
    useEffect(() => {
      refetch()
    }, [focused]);
    const { mutate } = useLogout();
    
    //로그아웃 요청, 전역 토큰 삭제, 기기 토큰 삭제, 로그인으로 이동
  const logoutHandler = (): void => {
    getToken().then(res => {
      if (res) {
        mutate(res);
      }
    });
  };

  const confirmLogout = (): void => {
    Alert.alert('로그아웃', '정말로 로그아웃 하시겠습니까?', [
      {
        text: '취소',
      },
      {
        text: '로그아웃',
        style: 'cancel',
        onPress: () => logoutHandler(),
      },
    ]);
  };

  const moveToProfileEdit = (): void => {
    navigation.navigate('ProfileEditScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.category}>
        {/* <Text style={styles.categoryTitle}>계정 설정</Text> */}
        <TouchableOpacity activeOpacity={0.6} onPress={moveToProfileEdit}>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>회원 정보 수정</Text>
            <ChevronRightIcon size="md" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={confirmLogout}>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>로그아웃</Text>
            <ChevronRightIcon size="md" />
          </View>
        </TouchableOpacity>
        <Center mt={3}>
          <Divider w="94%" />
        </Center>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;

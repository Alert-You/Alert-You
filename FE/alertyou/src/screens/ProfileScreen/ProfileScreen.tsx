import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  Avatar,
  Box,
  Spinner,
  Divider,
  ChevronRightIcon,
  Center,
} from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useIsFocused } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';

import { CustomSpinner } from '@/screens/ProfileScreen';
import { MAIN } from '@/theme/colorVariants';
import { ProfileInfo } from '@/screens/ProfileScreen';

import { styles } from './style';
import { requestAccountInfo, requestUserProfile } from './apis';
import { profileResponseType } from './types';
import { getToken } from '@/utils/auth';
import { useLogout } from '@/hooks';
import { useSetRecoilState } from 'recoil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  editPasswordConfirmState,
  editPhoneState,
  editSchoolNameState,
  profileFormState,
} from '@/store/profileState';

const ProfileScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const setProfileForm = useSetRecoilState(profileFormState);
  const setSchoolName = useSetRecoilState(editSchoolNameState);
  const setPassword2 = useSetRecoilState(editPasswordConfirmState);
  const setPhone = useSetRecoilState(editPhoneState);
  const focused = useIsFocused();

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

  const { mutate } = useLogout();

  const { data, refetch } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true, refetchOnMount: true },
  );
  useEffect(() => {
    refetch();
  }, [isFocused]);

  useEffect(() => {
    userQuery.refetch();
  }, [focused]);

  const isTeacher = useMemo(() => data?.role === '교사', [data?.role]);

  const moveToTeacherScreen = (): void => {
    if (isTeacher) {
      navigation.navigate('TeacherScreen');
    } else {
      Alert.alert('접근 권한 없음', '접근 권한이 없습니다.', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const moveToProfileEdit = (): void => {
    navigation.navigate('ProfileEditScreen');
  };

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

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              bg="green.500"
              size="lg"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}></Avatar>
            <View style={{ marginLeft: 16 }}>
              <Suspense fallback={<Spinner color={MAIN.red} size="md" />}>
                <ErrorBoundary FallbackComponent={CustomSpinner}>
                  <ProfileInfo
                    name={data?.name}
                    schoolName={data?.schoolName}
                    role={data?.role}
                    phone={data?.phone}
                  />
                </ErrorBoundary>
              </Suspense>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: 'white', marginTop: 16 }}>
          {isTeacher ? (
            <>
              <Text style={styles.buttonText}>학생 관리</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={moveToTeacherScreen}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="school-outline"
                      size={24}
                      color={MAIN.mainFont}
                    />
                    <Text style={styles.categoryText}>학생 목록 조회</Text>
                  </View>
                  <ChevronRightIcon size="sm" />
                </View>
              </TouchableOpacity>
              <Center mt={4}>
                <Divider w="94%" />
              </Center>
            </>
          ) : null}
          <Text style={styles.accountText}>약관 및 정책</Text>
          <View>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="file-document-multiple-outline"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>이용약관</Text>
                </View>
                <ChevronRightIcon size="sm" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="shield-account-outline"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>개인정보 처리방침</Text>
                </View>
                <ChevronRightIcon size="sm" />
              </View>
            </TouchableOpacity>
            <Center mt={4}>
              <Divider w="94%" />
            </Center>
          </View>
          <Text style={styles.accountText}>계정 관리</Text>
          <View>
            <TouchableOpacity activeOpacity={0.6} onPress={moveToProfileEdit}>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>회원 정보 수정</Text>
                </View>
                <ChevronRightIcon size="sm" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={confirmLogout}>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>로그아웃</Text>
                </View>
                <ChevronRightIcon size="sm" />
              </View>
            </TouchableOpacity>
            <Center mt={4}>
              <Divider w="94%" />
            </Center>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { Suspense, useEffect, useMemo } from 'react';
import {
  Avatar,
  Spinner,
  Divider,
  ChevronRightIcon,
  Center,
} from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useIsFocused } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSetRecoilState } from 'recoil';

import { CustomSpinner } from '@/screens/ProfileScreen';
import { MAIN, WHITE, BLUE, RED } from '@/theme/colorVariants';
import { ProfileInfo } from '@/screens/ProfileScreen';
import { getToken } from '@/utils/auth';
import { useLogout } from '@/hooks';
import {
  editPasswordConfirmState,
  editPhoneState,
  editSchoolNameState,
  profileFormState,
} from '@/store/profileState';

import { styles } from './style';
import { requestAccountInfo, requestUserProfile } from './apis';
import { profileResponseType } from './types';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const setProfileForm = useSetRecoilState(profileFormState);
  const setSchoolName = useSetRecoilState(editSchoolNameState);
  const setPassword2 = useSetRecoilState(editPasswordConfirmState);
  const setPhone = useSetRecoilState(editPhoneState);
  const { mutate } = useLogout();
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
  const { data, refetch } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true, refetchOnMount: true },
  );

  useEffect(() => {
    userQuery.refetch();
    refetch();
  }, [isFocused]);

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

  const moveToPrivacy = (): void => {
    navigation.navigate('PrivacyScreen');
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
  const noServiceYet = (): void => {
    Alert.alert('공사중', '추후 업데이트될 예정입니다.', [
      {
        text: '확인',
      },
    ]);
  };

  return (
    <>
      <LinearGradient
        colors={[BLUE.blue400, RED.red300p]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarFlex}>
              <Avatar
                bg={WHITE.white}
                size="lg"
                shadow={5}
                justifyContent="center"
                alignItems="center">
                <Lottie
                  source={require('@/assets/cat.json')}
                  autoPlay
                  loop={true}
                />
              </Avatar>
              <View style={styles.contentMargin}>
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
          <Divider h="4" bgColor={MAIN.lightGrey} />
          <View style={styles.teacherButton}>
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
              <TouchableOpacity activeOpacity={0.6} onPress={noServiceYet}>
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
              <TouchableOpacity activeOpacity={0.6} onPress={moveToPrivacy}>
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
            <Text style={styles.accountText}>앱 정보</Text>
            <View>
              <View style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="layers-triple-outline"
                    size={24}
                    color={MAIN.mainFont}
                  />
                  <Text style={styles.categoryText}>버전정보</Text>
                </View>
                <Text style={styles.versionText}>1.0.2</Text>
              </View>
              <Center mt={4}>
                <Divider w="94%" />
              </Center>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default ProfileScreen;

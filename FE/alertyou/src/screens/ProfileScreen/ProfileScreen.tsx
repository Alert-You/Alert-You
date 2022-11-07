import {View, Text, Button, Pressable, Alert} from 'react-native';
import React, {Suspense} from 'react';
import {Box, Spinner} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {redProfileGradientStyle} from '@/theme/gradient';
import {ProfileBox, SpinnerButton} from '@/components';
import {getToken} from '@/utils/auth';
import {useLogout} from '@/hooks';

import {styles} from './style';
import {requestUserProfile} from './apis';
import {profileResponseType} from './types';
import {MAIN} from '@/theme/colorVariants';
import ErrorBoundary from 'react-native-error-boundary';
import {CustomSpinner} from '@/screens/ProfileScreen';

const ProfileScreen = ({navigation}: any) => {
  const {data} = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    {suspense: true},
  );
  const {mutate} = useLogout();

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
        onPress: () => logoutHandler()
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Box bg={redProfileGradientStyle} w="100%" h="100%">
            <View style={styles.headerStyle}>
              <Text style={styles.headerText}>프로필</Text>
            </View>
            <Text style={styles.nameText}>{data?.name}</Text>
          </Box>
          <View style={styles.profileAbsoluteBox}>
            <Suspense fallback={<Spinner color={MAIN.red} size="md" />}>
              <ErrorBoundary FallbackComponent={CustomSpinner}>
                <ProfileBox
                  schoolInfo={data?.schoolName}
                  role={data?.role}
                  phone={data?.phone}
                />
              </ErrorBoundary>
            </Suspense>
          </View>
        </View>
        <Box flex={1.3}>
          <View style={styles.studentListButton}>
            <Text style={styles.buttonText}>학생 관리</Text>
            <SpinnerButton
              onPress={() => {
                navigation.navigate('TeacherScreen');
              }}
              height={55}
              fontSize={20}>
              학생 목록 조회
            </SpinnerButton>
          </View>
        </Box>
        <Pressable style={styles.logoutButton} onPress={confirmLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
        {/* <Button title="로그아웃" onPress={logoutHandler} /> */}
      </View>
    </>
  );
};

export default ProfileScreen;

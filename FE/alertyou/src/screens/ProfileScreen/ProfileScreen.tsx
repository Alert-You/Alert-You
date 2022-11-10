import {View, Text, Alert} from 'react-native';
import React, {Suspense, useMemo} from 'react';
import {Box, Spinner} from 'native-base';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {redProfileGradientStyle} from '@/theme/gradient';
import {ProfileBox, SpinnerButton} from '@/components';

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

  //로그아웃 요청, 전역 토큰 삭제, 기기 토큰 삭제, 로그인으로 이동
  const isTeacher = useMemo(() => data?.role === "교사", [data?.role])

  const moveToTeacherScreen = (): void => {
    if (isTeacher) {
      navigation.navigate('TeacherScreen');
    } else {
      Alert.alert('실패', '접근 권한이 없습니다.', [
        {
          text: '확인',
        }
      ]);
    }
  }

  const moveToSettingScreen = (): void => {
    navigation.navigate('SettingScreen')
  }


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
              onPress={moveToTeacherScreen}
              height={55}
              fontSize={20}>
              학생 목록 조회
            </SpinnerButton>
            <Text style={styles.accountText}>계정 관리</Text>
            <SpinnerButton
              onPress={moveToSettingScreen}
              height={55}
              fontSize={20}>
              계정 설정
            </SpinnerButton>
          </View>
        </Box>
      </View>
    </>
  );
};

export default ProfileScreen;

import { View, Text, Alert } from 'react-native';
import React, { Suspense, useEffect, useMemo } from 'react';
import { Box, Spinner } from 'native-base';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useIsFocused } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';

import { redProfileGradientStyle } from '@/theme/gradient';
import { ProfileBox, SpinnerButton } from '@/components';
import { CustomSpinner } from '@/screens/ProfileScreen';
import { MAIN } from '@/theme/colorVariants';

import { styles } from './style';
import { requestUserProfile } from './apis';
import { profileResponseType } from './types';

const ProfileScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused()
  const { data, refetch } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true, refetchOnMount: true },
  );
  useEffect(() => {
    refetch();
  }, [isFocused])

  //로그아웃 요청, 전역 토큰 삭제, 기기 토큰 삭제, 로그인으로 이동
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

  const moveToSettingScreen = (): void => {
    navigation.navigate('SettingScreen');
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
            {isTeacher ? (
              <>
                <Text style={styles.buttonText}>학생 관리</Text>
                <SpinnerButton
                  onPress={moveToTeacherScreen}
                  height={55}
                  fontSize={20}>
                  학생 목록 조회
                </SpinnerButton>
              </>
            ) : null}
            <Text style={styles.accountText}>계정 관리</Text>
            <SpinnerButton
              onPress={moveToSettingScreen}
              height={55}
              fontSize={20}>
              설정
            </SpinnerButton>
          </View>
        </Box>
      </View>
    </>
  );
};

export default ProfileScreen;

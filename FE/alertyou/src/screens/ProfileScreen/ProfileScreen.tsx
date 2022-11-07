import {View, Text, Button, Pressable} from 'react-native';
import React, {Suspense} from 'react';
import {Box, Menu, Spinner} from 'native-base';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Box bg={redProfileGradientStyle} w="100%" h="100%">
            <View style={styles.headerStyle}>
              <Text style={styles.headerText}>프로필</Text>
              <View style={styles.menuContainer}>
                <Menu
                  w="190"
                  trigger={triggerProps => {
                    return (
                      <Pressable {...triggerProps}>
                        <MaterialCommunityIcons
                          name="dots-vertical"
                          size={28}
                          color={MAIN.mainFont}
                        />
                      </Pressable>
                    );
                  }}>
                  <Menu.Item>회원정보수정</Menu.Item>
                  <Menu.Item>로그아웃</Menu.Item>
                </Menu>
              </View>
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
        <Button title="로그아웃" onPress={logoutHandler} />
      </View>
    </>
  );
};

export default ProfileScreen;

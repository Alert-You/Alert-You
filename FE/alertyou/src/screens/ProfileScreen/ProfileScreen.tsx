import {View, Text, StatusBar, Button} from 'react-native';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {Box} from 'native-base';

import {tokenState} from '@/store';
import {redProfileGradientStyle} from '@/theme/gradient';
import {ProfileBox, SpinnerButton} from '@/components';
import { isLoggedInState } from '@/store/isLoggedinState';
import { removeToken } from '@/utils/auth';

import {styles} from './style';

const ProfileScreen = ({navigation}: any) => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const tokenRemover = useSetRecoilState(tokenState);

  //전역 토큰 삭제, 기기 토큰 삭제, 로그인으로 이동
  const logoutHandler = (): void => {
    setIsLoggedIn(false);
    removeToken();
    tokenRemover('');
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Box bg={redProfileGradientStyle} w="100%" h="100%">
            <Text style={styles.headerText}>프로필</Text>
            <Text style={styles.nameText}>곽두팔</Text>
          </Box>
          <View style={styles.profileAbsoluteBox}>
            <ProfileBox
              schoolInfo="싸피고등학교 2학년 3반"
              role="학급원"
              phone="01022420407"
            />
          </View>
        </View>
        <Box flex={1.3}>
          <View style={styles.studentListButton}>
            <Text style={styles.buttonText}>학생 관리</Text>
            <SpinnerButton onPress={() => {}} height={55} fontSize={20}>
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

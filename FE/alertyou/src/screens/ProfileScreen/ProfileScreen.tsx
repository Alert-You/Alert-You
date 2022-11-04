import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Box } from 'native-base';

import { tokenState } from '@/store';
import { redProfileGradientStyle } from '@/theme/gradient';
import { ProfileBox, SpinnerButton } from '@/components';

import { styles } from './style';

const ProfileScreen = ({ navigation }: any) => {
  const [tmpToken, setTmpToken] = useRecoilState(tokenState);
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
            <SpinnerButton onPress={() => { navigation.navigate('TeacherScreen') }} height={55} fontSize={20}>
              학생 목록 조회
            </SpinnerButton>
          </View>
        </Box>
        {/* <Button title="로그인페이지 이동" onPress={() => setTmpToken('')} /> */}
      </View>
    </>
  );
};

export default ProfileScreen;

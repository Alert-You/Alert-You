import {View, Text, Button} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import {tokenState} from '@/store';

import {styles} from './style';
import {Box, ZStack} from 'native-base';
import {redProfileGradientStyle} from '@/theme/gradient';
import { WHITE } from '@/theme/colorVariants';
import { ProfileBox } from '@/components';

type Props = {
  navigation: any;
};

const ProfileScreen = ({navigation}: Props) => {
  const [tmpToken, setTmpToken] = useRecoilState(tokenState);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Box bg={redProfileGradientStyle} w="100%" h="100%">
          <Text style={styles.headerText}>프로필</Text>
          <Text style={styles.nameText}>곽두팔</Text>
        </Box>
        <View style={styles.profileAbsoluteBox}>
          <ProfileBox/>
        </View>
      </View>
      <Box flex={1.3}></Box>
      <Button title="로그인페이지 이동" onPress={() => setTmpToken('')} />
    </View>
  );
};

export default ProfileScreen;

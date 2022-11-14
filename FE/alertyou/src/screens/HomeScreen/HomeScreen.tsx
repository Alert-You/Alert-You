import { useEffect, useState } from 'react';
import { Box, ScrollView } from 'native-base';

import messaging from '@react-native-firebase/messaging';

import { styles } from './style';

import {
  HomeTitle,
  HelpText,
  MainBtn,
  ReportBtns,
  ToggleBtn,
} from '@/screens/HomeScreen/components';
import { emergencyBgStyle, nonEmergencyBgStyle } from '@/theme/Home/gradient';
import { useRecoilState } from 'recoil';
import { isEmergencyState } from '@/store/isEmergencyState';
import { saveToken } from './api';

type Props = {
  navigation: any;
};

const HomeScreen = ({ navigation }: Props) => {
  const [isEmergency, setIsEmergency] = useRecoilState(isEmergencyState);

  const toggleIsEmergency = () => {
    setIsEmergency((emergency: boolean) => !emergency);
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return getToken();
    }
  };

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      saveToken(fcmToken)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Box
        bg={isEmergency ? emergencyBgStyle : nonEmergencyBgStyle}
        style={styles.innerContainer}>
        <HomeTitle
          content={isEmergency ? '긴급 도움 요청' : '현장 목격 신고'}
        />
        <MainBtn isEmergency={isEmergency} />
        <ToggleBtn
          toggleIsEmergency={toggleIsEmergency}
          isEmergency={isEmergency}
        />
        {isEmergency ? <HelpText /> : <ReportBtns navigation={navigation} />}
      </Box>
    </ScrollView>
  );
};

export default HomeScreen;

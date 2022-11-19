import messaging from '@react-native-firebase/messaging';
import { emergencyBgStyle, nonEmergencyBgStyle } from '@/theme/Home/gradient';
import { isEmergencyState } from '@/store/isEmergencyState';
import {
  HelpText,
  MainBtn,
  ReportBtns,
  ToggleBtn,
} from '@/screens/HomeScreen/components';

import { Box, ScrollView, Text } from 'native-base';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { saveToken } from './api';
import { styles } from './style';

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
        <Text style={styles.mainTitle}>{isEmergency ? '긴급 도움 요청' : '현장 목격 신고'}</Text>
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

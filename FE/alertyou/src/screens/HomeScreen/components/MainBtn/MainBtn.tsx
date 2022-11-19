import {
  EmergencyInnerBtnStyle,
  EmergencyOuterBtnStyle,
  nonEmergencyInnerBtnStyle,
  nonEmergencyOuterBtnStyle
} from '@/theme/Home/gradient';
import { ReportModal } from '@/screens/HomeScreen/components/ReportModal';
import { reportVictim } from '@/screens/HomeScreen/api';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useNavigation } from '@react-navigation/native';
import { LoadingView } from '@/components/LoadingView';

import { AspectRatio, Center, Circle } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import Lottie from 'lottie-react-native';

import {
  emergencyToastProps,
  errorToastProps,
  lostLocationToastProps,
} from '@/constants/toastProps';
import { styles } from './style';

interface props {
  isEmergency: boolean;
}

const MainBtn = ({ isEmergency }: props) => {
  const navigation = useNavigation<any>();
  const { location } = useCurrentLocation();
  const showEmergencyToast = async () => {
    if (location) {
      const response = await reportVictim(location);
      if (response.msg === 'SUCCESS') {
        Toast.show(emergencyToastProps);
        navigation.navigate('AudioScreen');
      } else {
        Toast.show(errorToastProps);
      }
    } else {
      Toast.show(lostLocationToastProps);
    }
  };

  const [isShowReportModal, setIsShowReportModal] = useState<boolean>(false);
  const toggleIsShowReportModal = () => {
    setIsShowReportModal(prev => !prev);
  };

  return (
    <>
    {location ? <></> : <LoadingView />}
      <ReportModal
        isShowReportModal={isShowReportModal}
        toggleIsShowReportModal={toggleIsShowReportModal}
      />
      <Pressable
        onPress={isEmergency ? showEmergencyToast : toggleIsShowReportModal}>
        <AspectRatio ratio={1 / 1} width="100%" my={5}>
          <Center>
            <Circle size="100%" style={styles.outerLine}>
              <Circle size="93%" style={styles.innerLine}>
                <Circle size="93%" bg={isEmergency ? EmergencyOuterBtnStyle : nonEmergencyOuterBtnStyle}>
                  <Circle size="96%" bg={isEmergency ? EmergencyInnerBtnStyle : nonEmergencyInnerBtnStyle}>
                  <Circle size="60%">
                    <Lottie
                      source={require('@/assets/lottie/shake-bell')}
                      autoPlay
                      loop={true}
                    />
                  </Circle>
                  </Circle>
                </Circle>
              </Circle>
            </Circle>
          </Center>
        </AspectRatio>
      </Pressable>
    </>
  );
};

export default MainBtn;

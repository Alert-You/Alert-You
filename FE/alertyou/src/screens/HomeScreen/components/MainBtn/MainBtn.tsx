import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {AspectRatio, Center, Circle} from 'native-base';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ReportModal } from '@/screens/HomeScreen/components/ReportModal'

interface props {
  isEmergency: boolean;
}

const MainBtn = ({isEmergency}: props) => {
  const emergencyToastProps = {
    type: 'error',
    text1: '도움 요청 완료',
    text2: '교사와 보디가드에게 도움 요청이 완료되었습니다!',
  };

  const showEmergencyToast = () => {
    Toast.show(emergencyToastProps);
  };

  const [isShowReportModal, setIsShowReportModal] = useState<boolean>(false);
  const toggleIsShowReportModal = () => {
    setIsShowReportModal(prev => !prev);
  };

  return (
    <>
    <ReportModal isShowReportModal={isShowReportModal} toggleIsShowReportModal={toggleIsShowReportModal}/>
      <Pressable onPress={isEmergency ? showEmergencyToast : toggleIsShowReportModal}>
        <AspectRatio
          ratio={1/1}
          width="100%">
          <Center>
            <Circle size="80%" bg={outerGradientStyle}>
              <Circle size="88%" bg={innerGradientStyle}>
                <MaterialCommunityIcons
                  name={isEmergency ? 'bell-alert' : 'account-group'}
                  color={isEmergency ? '#942d25' : '#5253a1'}
                  size={150}
                />
              </Circle>
            </Circle>
          </Center>
        </AspectRatio>
      </Pressable>
    </>
  );
};

export default MainBtn;

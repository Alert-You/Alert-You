import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {toastType} from '@/types/toastType';
import {AspectRatio, Center, Circle} from 'native-base';
import React from 'react';
import {Button, Pressable} from 'react-native';
import Toast from 'react-native-toast-message';

interface props {
  isEmergency: boolean;
}

const MainBtn = ({isEmergency}: props) => {
  const emergencyToastProps = {
    type: 'error',
    text1: '도움 요청 완료',
    text2: '교사와 보디가드에게 도움 요청이 완료되었습니다!',
  };

  const nonEmergencyToastProps = {
    type: 'info',
    text1: '현장 목격 신고 완료',
    text2: '교사와 보디가드에게 목격 신고가 접수되었습니다!',
  };

  const showToast = () => {
    Toast.show(isEmergency ? emergencyToastProps : nonEmergencyToastProps);
  };

  return (
    <Pressable onPress={showToast}>
      <AspectRatio
        ratio={{
          base: 1 / 1,
        }}
        width={{
          base: '100%',
        }}>
        <Center>
          <Circle size="80%" bg={outerGradientStyle}>
            <Circle size="88%" bg={innerGradientStyle}></Circle>
          </Circle>
        </Center>
      </AspectRatio>
    </Pressable>
  );
};

export default MainBtn;

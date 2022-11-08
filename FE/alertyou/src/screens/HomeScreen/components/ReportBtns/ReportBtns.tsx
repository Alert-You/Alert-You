import {HStack} from 'native-base';
import React from 'react';
import {ReportBtn} from '@/screens/HomeScreen/components';

const ReportBtns = ({navigation}: any) => {
  const moveCameraScreen = () => {
    navigation.navigate('CameraScreen');
  }

  const moveGalleryScreen = () => {
    navigation.navigate('GalleryScreen');
  }

  return (
    <HStack justifyContent="space-between">
      <ReportBtn name='camera' nameKr='현장 촬영' moveScreen={moveCameraScreen}/>
      <ReportBtn name='image-plus' nameKr='사진 업로드' moveScreen={moveGalleryScreen}/>
      <ReportBtn name='microphone' nameKr='녹음 시작' moveScreen={moveCameraScreen}/>
    </HStack>
  );
};

export default ReportBtns;

import {Flex, HStack} from 'native-base';
import React from 'react';
import {ReportBtn} from '@/screens/HomeScreen/components';

const ReportBtns = () => {
  return (
    <HStack justifyContent="space-between">
      <ReportBtn name='camera' nameKr='현장 촬영'/>
      <ReportBtn name='image-plus' nameKr='사진 업로드'/>
      <ReportBtn name='microphone' nameKr='녹음 시작'/>
    </HStack>
  );
};

export default ReportBtns;

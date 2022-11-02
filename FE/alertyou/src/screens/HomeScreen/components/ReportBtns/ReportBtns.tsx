import {Flex, HStack} from 'native-base';
import React from 'react';
import {ReportBtn} from '@/screens/HomeScreen/components';

const ReportBtns = () => {
  return (
    <HStack justifyContent="space-between">
      <ReportBtn name='camera'/>
      <ReportBtn name='image-plus'/>
      <ReportBtn name='microphone'/>
    </HStack>
  );
};

export default ReportBtns;

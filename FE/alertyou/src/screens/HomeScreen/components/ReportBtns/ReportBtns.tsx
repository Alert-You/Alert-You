import {Flex, HStack} from 'native-base';
import React from 'react';
import {ReportBtn} from '@/screens/HomeScreen/components';

const ReportBtns = () => {
  return (
    // <Flex bg="white" width="100%" direction="row" mb="2.5" mt="1.5" justifyContent="center">
    //   <ReportBtn />
    //   <ReportBtn />
    //   <ReportBtn />
    // </Flex>
    <HStack justifyContent="space-between">
      <ReportBtn />
      <ReportBtn />
      <ReportBtn />
    </HStack>
  );
};

export default ReportBtns;

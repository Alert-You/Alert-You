import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {AspectRatio, Center} from 'native-base';
import React from 'react';

const ReportBtn = () => {

  return (
    <>
      <AspectRatio
        ratio={{
          base: 1 / 1,
        }}
        width={{
          base: '28%',
        }}
        >
        <Center rounded="3xl" bg={outerGradientStyle}>
          <Center size="85%" rounded="full" bg={innerGradientStyle}></Center>
        </Center>
      </AspectRatio>
    </>
  );
};

export default ReportBtn;

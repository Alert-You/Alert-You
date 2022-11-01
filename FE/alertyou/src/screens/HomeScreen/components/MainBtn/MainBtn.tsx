import { innerGradientStyle, outerGradientStyle } from '@/theme/gradient';
import {AspectRatio, Center, Circle} from 'native-base';
import React from 'react';

const MainBtn = () => {
  return (
    <>
      <AspectRatio
        ratio={{
          base: 1 / 1,
        }}
        width={{
          base: '100%',
        }}>
        <Center>
          <Circle size="80%" bg={outerGradientStyle}>
            <Circle size="88%" bg={innerGradientStyle}>
            </Circle>
          </Circle>
        </Center>
      </AspectRatio>
    </>
  );
};

export default MainBtn;

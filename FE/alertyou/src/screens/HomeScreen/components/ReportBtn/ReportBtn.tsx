import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {AspectRatio, Center} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN } from '@/theme/colorVariants'

interface propsType {
  name: string;
}

const ReportBtn = ({name}: propsType) => {

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
          <Center size="85%" rounded="full" bg={innerGradientStyle}>
          <MaterialCommunityIcons
                name={name}
                color={MAIN.placeholder}
                size={50}
              />
          </Center>
        </Center>
      </AspectRatio>
    </>
  );
};

export default ReportBtn;

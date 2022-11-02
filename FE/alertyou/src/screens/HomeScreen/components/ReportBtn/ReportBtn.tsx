import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {AspectRatio, Center, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN } from '@/theme/colorVariants'

interface propsType {
  name: string;
  nameKr: string;
}

const ReportBtn = ({name, nameKr}: propsType) => {

  return (
    <VStack width='28%' space={2}>
      <AspectRatio
      width='100%'
        ratio={{
          base: 1 / 1,
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
      <Center _text={{color:'white', fontSize:'lg'}}>{nameKr}</Center>
    </VStack>
  );
};

export default ReportBtn;

import {innerGradientStyle, outerGradientStyle} from '@/theme/gradient';
import {AspectRatio, Center, Pressable, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAIN} from '@/theme/colorVariants';

interface propsType {
  name: string;
  nameKr: string;
  moveScreen: () => void;
}

const ReportBtn = ({name, nameKr, moveScreen}: propsType) => {
  return (
    <VStack width="28%">
      <Pressable onPress={moveScreen}>
        <AspectRatio width="100%" ratio={1 / 1}>
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
        <Center mt={2} _text={{color: 'white', fontSize: 'lg'}}>{nameKr}</Center>
      </Pressable>
    </VStack>
  );
};

export default ReportBtn;

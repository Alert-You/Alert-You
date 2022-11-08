import {
  AspectRatio,
  Center,
  Circle,
  HStack,
  PresenceTransition,
  Pressable,
} from 'native-base';
import {emergencyBgStyle, nonEmergencyBgStyle} from '@/theme/Home/gradient';
import React from 'react';
import {Dimensions} from "react-native"
import { MAIN } from '@/theme/colorVariants';

interface propsType {
  toggleIsEmergency: any;
  isEmergency: boolean;
}

const ToggleBtn = ({toggleIsEmergency, isEmergency}: propsType) => {
  const calcToggleMove = () => {
    const WIDTH = Dimensions.get('window').width;
    const WIDTH_INNER = WIDTH-32;
    const TOGGLE_OUTER_WIDTH = WIDTH_INNER*0.4;
    return TOGGLE_OUTER_WIDTH*0.6;
  }
  const toggleMove = calcToggleMove();

  return (
    <Center my={3} mb={9}>
      <Pressable onPress={toggleIsEmergency}>
        <AspectRatio ratio={5 / 2} width="40%" bg={MAIN.lightGrey} rounded="full">
          <HStack width="100%" height="100%" p="5px" alignItems="center">
            <PresenceTransition
              visible={!isEmergency}
              initial={{
                translateX: 0,
                rotate: '0deg',
              }}
              animate={{
                translateX: toggleMove,
                rotate: '270deg',
                transition: {
                  duration: 250,
                },
              }}>
              <Center>
                <AspectRatio
                  ratio={1 / 1}
                  height="100%"
                  bg={isEmergency ? emergencyBgStyle : nonEmergencyBgStyle}
                  rounded="full">
                  <Circle m={0.3} bg={MAIN.lightGrey} size="60%"></Circle>
                </AspectRatio>
              </Center>
            </PresenceTransition>
          </HStack>
        </AspectRatio>
      </Pressable>
    </Center>
  );
};

export default ToggleBtn;

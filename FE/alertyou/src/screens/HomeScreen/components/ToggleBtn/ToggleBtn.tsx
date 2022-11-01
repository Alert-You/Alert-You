import {
  AspectRatio,
  Box,
  Center,
  Circle,
  HStack,
  PresenceTransition,
  Pressable,
} from 'native-base';
import {emergencyBgStyle, nonEmergencyBgStyle} from '@/theme/Home/gradient';
import React from 'react';

interface propsType {
  toggleIsEmergency: any;
  isEmergency: boolean;
}

const ToggleBtn = ({toggleIsEmergency, isEmergency}: propsType) => {
  return (
    <Center my={3} mb={9}>
      <Pressable onPress={toggleIsEmergency}>
        <AspectRatio ratio={3 / 1} width="50%" bg="white" rounded="full">
          <HStack width="100%" height="100%" p={1} alignItems="center">
            <PresenceTransition
              visible={!isEmergency}
              initial={{
                translateX: 0,
                rotate: '0deg',
              }}
              animate={{
                translateX: 104,
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
                  <Circle m={0.3} bg="white" size="60%"></Circle>
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

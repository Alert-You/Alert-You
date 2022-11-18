import {
  AspectRatio,
  Center,
  HStack,
  PresenceTransition,
  Pressable,
} from 'native-base';
import {emergencyBgStyle, nonEmergencyBgStyle} from '@/theme/Home/gradient';
import {MAIN} from '@/theme/colorVariants';
import { W } from '@/constants/dimensions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface propsType {
  toggleIsEmergency: any;
  isEmergency: boolean;
}

const ToggleBtn = ({toggleIsEmergency, isEmergency}: propsType) => {
  const calcToggleMove = () => {
    const W_INNER = W - 32;
    const TOGGLE_OUTER_W = W_INNER * 0.4;
    return TOGGLE_OUTER_W * 0.6;
  };
  const toggleMove = calcToggleMove();

  return (
    <Center my={3} mb={9}>
      <Pressable onPress={toggleIsEmergency}>
        <AspectRatio
          ratio={5 / 2}
          width="40%"
          bg="white"
          rounded="full">
          <HStack width="100%" height="100%" p="5px" alignItems="center">
            {/* <HStack style={styles.container}> */}
            <PresenceTransition
              visible={!isEmergency}
              initial={{
                translateX: 0,
                rotate: '0deg',
              }}
              animate={{
                translateX: toggleMove,
                rotate: '220deg',
                transition: {
                  duration: 250,
                },
              }}>
              <AspectRatio
                ratio={1 / 1}
                height="100%"
                bg={isEmergency ? emergencyBgStyle : nonEmergencyBgStyle}
                rounded="full">
                <Center>
                  <MaterialCommunityIcons
                    name={
                      isEmergency
                        ? 'white-balance-sunny'
                        : 'moon-waning-crescent'
                    }
                    size={35}
                    color="white"
                  />
                </Center>
              </AspectRatio>
            </PresenceTransition>
          </HStack>
        </AspectRatio>
      </Pressable>
    </Center>
  );
};

export default ToggleBtn;

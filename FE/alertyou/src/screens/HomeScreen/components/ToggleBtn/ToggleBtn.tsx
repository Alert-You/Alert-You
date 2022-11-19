import {
  AspectRatio,
  Center,
  HStack,
  PresenceTransition,
  Pressable,
} from 'native-base';
import { emergencyBgStyle, nonEmergencyBgStyle, emergencyColor, nonEmergencyColor } from '@/theme/Home/gradient';
import { W } from '@/constants/dimensions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';

interface propsType {
  toggleIsEmergency: any;
  isEmergency: boolean;
}

const ToggleBtn = ({ toggleIsEmergency, isEmergency }: propsType) => {
  const calcToggleMove = () => {
    const W_INNER = W - 32;
    const TOGGLE_OUTER_W = W_INNER * 0.3;
    return TOGGLE_OUTER_W * 0.5;
  };
  const toggleMove = calcToggleMove();

  return (
    <Center
      style={styles.container}
      borderColor={isEmergency ? emergencyColor.light : nonEmergencyColor.light}
      shadow={2}
    >
      <Pressable onPress={toggleIsEmergency}>
        <AspectRatio
          ratio={2 / 1}
          width="30%"
          bg="white"
          rounded="full">
          <HStack width="100%" height="100%" p="2px" alignItems="center">
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

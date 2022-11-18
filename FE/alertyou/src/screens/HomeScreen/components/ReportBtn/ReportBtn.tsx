import { reportBtnStyle } from '@/theme/Home/gradient';
import { AspectRatio, Center, Pressable, VStack } from 'native-base';
import Lottie from 'lottie-react-native';

interface propsType {
  name: string;
  nameKr: string;
  moveScreen: () => void;
}

const ReportBtn = ({ name, nameKr, moveScreen }: propsType) => {
  let source;
  if (name==='camera') {
    source = require("@/assets/lottie/report-camera")
  } else if (name==='gallery') {
    source = require("@/assets/lottie/report-gallery")
  } else if (name==='microphone') {
    source = require("@/assets/lottie/report-mic")
  }

  return (
    <VStack width="27%">
      <Pressable onPress={moveScreen}>
        <AspectRatio width="100%" ratio={1 / 1}>
          <Center shadow="9" rounded="full" bg={reportBtnStyle} >
            <Lottie
              source={source}
              autoPlay
              loop={true}
            />
          </Center>
        </AspectRatio>
        <Center mt={4} _text={{ color: 'white', fontSize: 'lg' }}>{nameKr}</Center>
      </Pressable>
    </VStack>
  );
};

export default ReportBtn;

import { ReportBtn } from '@/screens/HomeScreen/components';
import { HStack } from 'native-base';

const ReportBtns = ({ navigation }: any) => {
  

  const moveCameraScreen = () => {
    navigation.navigate('CameraScreen');
  }

  const moveGalleryScreen = () => {
    navigation.navigate('GalleryScreen');
  }

  const moveAudioScreen = () => {
    navigation.navigate('AudioScreen');
  }

  return (
    <HStack width="100%" justifyContent="space-around" px={3}>
      <ReportBtn name='camera' nameKr='현장 촬영' moveScreen={moveCameraScreen} />
      <ReportBtn name='gallery' nameKr='사진 업로드' moveScreen={moveGalleryScreen} />
      <ReportBtn name='microphone' nameKr='녹음 시작' moveScreen={moveAudioScreen} />
    </HStack>
  );
};

export default ReportBtns;

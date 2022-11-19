import { HomeParamList } from '@/navigations/HomeNavigation/HomeNavigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { LoadingView } from '@/components/LoadingView';
import {
  getNewCameraPermission,
  getNewMicrophonePermission,
} from '@/utils/permission';

import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Button, View } from 'native-base';
import { styles } from './style';
import { useRef } from 'react';

const CameraScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeParamList>>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  async function takePhoto() {
    const photo = await camera.current?.takePhoto({
      flash: 'off',
    });
    if (photo?.path) {
      const uri = await CameraRoll.save(photo.path);
      navigation.navigate('CameraCheckScreen', { uri });
    }
  }

  if (device == null) return <></>;
  getNewCameraPermission();
  getNewMicrophonePermission();

  return (
    <>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.cameraButtonContainer}>
        <Button onPress={takePhoto} style={styles.cameraButton}></Button>
      </View>
    </>
  );
};

export default CameraScreen;

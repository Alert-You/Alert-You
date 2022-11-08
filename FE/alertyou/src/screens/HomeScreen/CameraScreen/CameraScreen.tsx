import LoadingView from '@/components/LoadingView';
import React, {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {styles} from './style';
import {
  getNewCameraPermission,
  getNewMicrophonePermission,
} from '@/utils/permission';
import {Button, View} from 'native-base';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { HomeParamList } from '@/navigations/HomeNavigation/HomeNavigation';

const CameraScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeParamList>>()
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  async function takePhoto() {
    const photo = await camera.current?.takePhoto({
      flash: 'off'
    })
    if (photo?.path) {
      const uri = await CameraRoll.save(photo.path);
      navigation.navigate('CameraCheckScreen', {uri})
    }
  }

  if (device == null) return <LoadingView />;
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

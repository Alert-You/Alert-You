import LoadingView from '@/components/LoadingView';
import React, {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {styles} from './style';
import {
  getNewCameraPermission,
  getNewMicrophonePermission,
} from '@/utils/permission';
import {Button, View} from 'native-base';
// import CameraRoll from '@react-native-community/cameraroll';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const CameraScreen = ({navigation}: any) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  async function takePhoto() {
    const photo = await camera.current?.takePhoto({
      flash: 'off'
    })
    console.log(typeof(photo), photo);
    if (photo?.path) {
      const uri = `file://${photo.path}`
      const result = await CameraRoll.save(uri);
      console.log('🐤result', result);
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

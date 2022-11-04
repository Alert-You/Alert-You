import LoadingView from '@/components/LoadingView';
import React, {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {styles} from './style';
import {
  getNewCameraPermission,
  getNewMicrophonePermission,
} from '@/utils/permission';
import {Button, View} from 'native-base';

const CameraScreen = ({navigation}: any) => {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  async function takePhoto() {
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    const ret = await camera.current;
    console.log('ret', ret);
    // console.log('-=-=-=-=-=-=-=-=-');

    // const photo = await camera.current.takeSnapshot({
    //   quality: 85,
    //   skipMetadata: true,
    // });
    // console.log(photo);
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

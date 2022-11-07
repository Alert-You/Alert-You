import {Camera} from 'react-native-vision-camera';

export async function getAvailableCameraDevices() {
  return await Camera.getAvailableCameraDevices();
}

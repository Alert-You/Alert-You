import {PermissionsAndroid, Platform} from 'react-native';
import {Camera} from 'react-native-vision-camera';

export async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function requestAccessLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.warn(e);
  }
}

export async function getCameraPermission() {
  return await Camera.getCameraPermissionStatus();
}

export async function getMicrophonePersion() {
  return await Camera.getMicrophonePermissionStatus();
}

export async function getNewCameraPermission() {
  return await Camera.requestCameraPermission();
}

export async function getNewMicrophonePermission() {
  return await Camera.requestMicrophonePermission();
}

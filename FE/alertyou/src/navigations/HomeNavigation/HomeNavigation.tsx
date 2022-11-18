import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CameraScreen,
  CameraCheckScreen,
  HomeScreen,
  GalleryScreen,
  AudioScreen,
} from '@/screens';

export type HomeParamList = {
  HomeScreen: undefined;
  CameraScreen: undefined;
  CameraCheckScreen: {uri: string};
  GalleryScreen: undefined;
  AudioScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeParamList>();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraCheckScreen"
        component={CameraCheckScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioScreen"
        component={AudioScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

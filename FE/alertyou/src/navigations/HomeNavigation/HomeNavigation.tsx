import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@/screens';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    //알아서 initialRouteName 바꾸세요.
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

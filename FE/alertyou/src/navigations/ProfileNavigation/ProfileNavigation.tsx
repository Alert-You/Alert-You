import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  return (
    //알아서 initialRouteName 바꾸세요.
    <Stack.Navigator initialRouteName="ProfileScreen">
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

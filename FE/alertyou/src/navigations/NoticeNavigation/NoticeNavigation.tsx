import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const NoticeNavigation = () => {
  return (
    //알아서 initialRouteName 바꾸세요.
    <Stack.Navigator initialRouteName="NoticeScreen">
    </Stack.Navigator>
  );
}

export default NoticeNavigation
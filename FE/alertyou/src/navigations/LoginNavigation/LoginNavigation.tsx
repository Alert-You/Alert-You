import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@/screens';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoginNavigation
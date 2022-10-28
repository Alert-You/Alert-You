import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@/screens';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
        title: '로그인',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20
        }
      }}/>
    </Stack.Navigator>
  );
}

export default LoginNavigation
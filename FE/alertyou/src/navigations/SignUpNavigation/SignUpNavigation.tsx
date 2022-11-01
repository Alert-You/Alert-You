import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PhoneAuthScreen, SearchSchoolScreen, SignUpScreen, SignUpSubScreen} from '@/screens';


const Stack = createNativeStackNavigator();

const SignUpNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="SignUpSubScreen"
        component={SignUpSubScreen}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="searchSchoolScreen"
        component={SearchSchoolScreen}
        options={{
          title: '학교 찾기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="PhoneAuthScreen"
        component={PhoneAuthScreen}
        options={{
          title: '휴대폰 인증',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SignUpNavigation;

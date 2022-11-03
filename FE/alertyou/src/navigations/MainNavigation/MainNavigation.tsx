import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRecoilValue} from 'recoil';
import {
  HomeNavigation,
  NoticeNavigation,
  ProfileNavigation,
  SignUpNavigation,
  LoginNavigation,
} from '@/navigations';
import {isLoggedInState} from '@/store/isLoggedinState';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  //토큰 존재 여부 판단
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Notice"
            component={NoticeNavigation}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginNavigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default MainNavigation;

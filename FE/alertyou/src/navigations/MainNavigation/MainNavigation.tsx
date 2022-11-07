import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  HomeNavigation,
  NoticeNavigation,
  ProfileNavigation,
  SignUpNavigation,
  LoginNavigation,
} from '@/navigations';
import {isLoggedInState} from '@/store';
import {SplashScreen} from '@/screens';
import {getToken} from '@/utils/auth';
import {useRefreshToken} from '@/hooks';
import {splashState} from '@/store/splashState';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN } from '@/theme/colorVariants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const {mutate: refreshMutate} = useRefreshToken();
  const appLoaded = useRecoilValue(splashState);
  const setSplashState = useSetRecoilState(splashState);

  //자동로그인 로직
  useEffect(() => {
    getToken().then(token => {
      if (token) {
        //처리가 끝날 시에 스플레쉬 스크린이 꺼짐
        refreshMutate(token);
      } else {
        setTimeout(() => {
          setSplashState(true);
        }, 2000);
      }
    });
  }, []);

  //토큰 존재 여부 판단
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return !appLoaded ? (
    <SplashScreen />
  ) : (
    <>
      {isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: MAIN.red,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {height: 60}
          }}
          >
          <Tab.Screen
            name="Notice"
            component={NoticeNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  color={color}
                  size={35}
                  name="bell-alert-outline"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  color={color}
                  size={35}
                  name="home-outline"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  color={color}
                  size={35}
                  name="account-outline"
                />
              ),
            }}
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

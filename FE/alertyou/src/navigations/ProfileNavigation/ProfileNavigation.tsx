import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditClassScreen, EditSchoolScreen, ProfileEditScreen, ProfileScreen, TeacherScreen } from "@/screens"
import { StudentDetail } from '@/screens/ProfileScreen';
import { MAIN, RED, WHITE } from '@/theme/colorVariants';
import { useQuery } from '@tanstack/react-query';
import { profileResponseType } from '@/screens/ProfileScreen/types';
import { AxiosError } from 'axios';
import { requestUserProfile } from '@/screens/ProfileScreen/apis';


export type ProfileParamList = {
  ProfileScreen: undefined;
  TeacherScreen: undefined;
  StudentDetail: { studentId: number | null };
  ProfileEditScreen: undefined;
  EditSchoolScreen: undefined;
  EditClassScreen: undefined;
};
const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileNavigation = () => {
  const { data } = useQuery<profileResponseType, AxiosError>(
    ['userProfile'],
    requestUserProfile,
    { suspense: true, refetchOnMount: true },
  );
  const schoolName = data?.schoolName.split(' ')[0]
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeacherScreen"
        component={TeacherScreen}
        options={{
          headerTitle: schoolName,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
          headerTintColor: WHITE.white,
          headerStyle: {
            backgroundColor: RED.red500,
          },
        }}
      />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={ProfileEditScreen}
        options={{
          title: '회원정보수정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="EditSchoolScreen"
        component={EditSchoolScreen}
        options={{
          title: '학교 검색',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="EditClassScreen"
        component={EditClassScreen}
        options={{
          title: '학급 선택',
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

export default ProfileNavigation;

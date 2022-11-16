import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditClassScreen, EditSchoolScreen, ProfileEditScreen, ProfileScreen, SettingScreen, TeacherScreen } from "@/screens"
import { StudentDetail } from '@/screens/ProfileScreen';
import { RED } from '@/theme/colorVariants';


export type ProfileParamList = {
  ProfileScreen: undefined;
  TeacherScreen: undefined;
  StudentDetail: { studentId: number | null };
  SettingScreen: undefined;
  ProfileEditScreen: undefined;
  EditSchoolScreen: undefined;
  EditClassScreen: undefined;
};
const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileNavigation = () => {
  const schoolName: string = '대전광역시 유성구 싸피고등학교'
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
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: RED.red700,
          },
        }}
      />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: '계정 설정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
        }}
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

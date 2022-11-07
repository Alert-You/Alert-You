import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen, TeacherScreen } from "@/screens"
import { StudentDetail } from '@/screens/ProfileScreen';
import { RED } from '@/theme/colorVariants';


export type ProfileParamList = {
  ProfileScreen: undefined,
  TeacherScreen: undefined,
  StudentDetail: { studentId: number }
}
const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileNavigation = () => {
  const schoolName: string = '대전광역시 유성구 싸피고등학교'
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="TeacherScreen" component={TeacherScreen} options={{
        headerTitle: schoolName,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: RED.red700,
        }
      }} />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

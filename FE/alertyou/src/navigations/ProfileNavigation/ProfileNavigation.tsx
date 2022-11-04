import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen, TeacherScreen } from "@/screens"
import { RED } from '@/theme/colorVariants';
const Stack = createNativeStackNavigator();

const ProfileNavigation = () => {
  const schoolName: string = '대전광역시 유성구 싸피고등학교'
  return (
    //알아서 initialRouteName 바꾸세요.
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
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

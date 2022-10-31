import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoticeScreen } from "@/screens"

const Stack = createNativeStackNavigator();

const NoticeNavigation = () => {
  return (
    //알아서 initialRouteName 바꾸세요.
    <Stack.Navigator initialRouteName="NoticeScreen">
      <Stack.Screen
        name="NoticeScreen"
        component={NoticeScreen}
        options={{
          headerTitle: '알림 내역',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
            color: '#555555',
          },
          headerStyle:
            { backgroundColor: '#FFF9F7' }
        }} />
    </Stack.Navigator>
  );
};

export default NoticeNavigation;

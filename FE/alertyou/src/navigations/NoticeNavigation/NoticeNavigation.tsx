import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoticeScreen } from "@/screens"
import { NoticeMap } from '@/screens/NoticeScreen';

export type NoticeParamList = {
  NoticeScreen: undefined,
  NoticeMap: { reportId: number }
}

const Stack = createNativeStackNavigator<NoticeParamList>();

const NoticeNavigation = () => {
  return (
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
          },
          headerStyle: {
            backgroundColor: '#FFF9F7'
          }
        }}
      />
      <Stack.Screen
        name="NoticeMap"
        component={NoticeMap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NoticeNavigation;

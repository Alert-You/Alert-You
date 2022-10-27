import React from 'react';
import {View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

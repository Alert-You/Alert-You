import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import { MainNavigation } from '@/navigations';
import { NativeBaseProvider } from 'native-base';

const App: React.FunctionComponent = () => (
  <RecoilRoot>
    <NativeBaseProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  </RecoilRoot>
);

export default App;

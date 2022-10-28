import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import { MainNavigation } from '@/navigations';

const App: React.FunctionComponent = () => {

  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainNavigation/>
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;

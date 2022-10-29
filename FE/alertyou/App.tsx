import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import {MainNavigation} from '@/navigations';
import {NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClinet = new QueryClient();

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClinet}>
    <RecoilRoot>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import {MainNavigation} from '@/navigations';
import {NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClinet}>
    <RecoilRoot>
      <NativeBaseProvider config={config}>
        <NavigationContainer>
          <MainNavigation />
          <Toast />
        </NavigationContainer>
      </NativeBaseProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  }
}

export default App;

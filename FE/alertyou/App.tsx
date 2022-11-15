import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { AppRegistry } from 'react-native';
import { RecoilRoot } from 'recoil';
import { NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainNavigation } from '@/navigations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import pushNoti from '@/utils/pushNoti';
import notifee, {
  AndroidImportance,
  AndroidColor,
} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  pushNoti.displayNoti(remoteMessage);
});

notifee.onBackgroundEvent(async (message: any) => {
  console.log('nofifee message: ', message.detail.notification);
});

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

AppRegistry.registerComponent('app', () => App);

const App: React.FunctionComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      pushNoti.displayNoti(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClinet}>
      <RecoilRoot>
        <PaperProvider>
          <NativeBaseProvider config={config}>
            <NavigationContainer>
              <MainNavigation />
              <Toast />
            </NavigationContainer>
          </NativeBaseProvider>
        </PaperProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default App;

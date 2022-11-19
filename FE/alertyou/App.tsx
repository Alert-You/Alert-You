import React, { useEffect } from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
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
      pushNoti.displayNoti(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const toastConfig = {
    success: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'skyblue', height: '90%', elevation: 9}}
        contentContainerStyle={{ padding: 20 }}
        text1Style={{
          fontSize: 20,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
      />
    ),
    error: (props:any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: '#ff7a4a', height: '90%', elevation: 9}}
        contentContainerStyle={{ padding: 20 }}
        text1Style={{
          fontSize: 20,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 18,
          fontWeight: '400',
        }}
      />
    ),
  };

  return (
    <QueryClientProvider client={queryClinet}>
      <RecoilRoot>
        <PaperProvider>
          <NativeBaseProvider config={config}>
            <NavigationContainer>
              <MainNavigation />
              <Toast config={toastConfig} />
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

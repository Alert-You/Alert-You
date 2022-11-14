import { AppState } from 'react-native';
import notifee, { AndroidImportance, AndroidColor } from '@notifee/react-native';

const displayNotification = async (message: any) => {
  const channelAnoucement = await notifee.createChannel({
    id: 'Alert You',
    name: 'Alert You',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId: channelAnoucement,
    },
  });
};

export default {
  displayNoti: (remoteMessage: any) => {
    displayNotification(remoteMessage)
  },
};
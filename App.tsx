import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect, useState } from 'react';
import { Notification } from './src/components/Notification';

OneSignal.setAppId('26d1882f-189c-4686-a03d-cca7e5799881');
OneSignal.setEmail('marcelo@email.com')

export default function App() {
  const [notification, setNotification] = useState<OSNotification>()
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(()=> {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationRecivedEvent: NotificationReceivedEvent) => {
      const response = notificationRecivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  }, []) 

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

    {notification?.title && 
      <Notification 
        title={notification.title} 
        onClose={(() => setNotification(undefined))} />
    }
    </NativeBaseProvider>
  );
}
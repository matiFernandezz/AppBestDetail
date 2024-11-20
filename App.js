import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import Header  from './src/components/Header';
import MainNavigator from './src/navigation/MainNavigator';
import { useEffect, useState } from 'react';

import {store} from './src/app/store';
import { Provider } from 'react-redux';
import { createSessionsTable } from './src/db';

createSessionsTable()
  .then((result)=>console.log("Tabla creada con éxito: ", result))
  .catch((error)=>console.log("Error al crear la tabla Sessions: ", error))

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Variable.ttf'),
    'Roboto' : require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoBold' : require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <Header/>
      <MainNavigator />

      <StatusBar style="light" />
    </Provider>
  );
}

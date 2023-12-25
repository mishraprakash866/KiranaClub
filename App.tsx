import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import { colorPalettes, routeNames } from './src/config/Constants';
import Splash from './src/screens/Splash';
import { OnlineOffline } from './src/generalComponents/OnlineOffline';

const Stack = createNativeStackNavigator();

const App = () => {

  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener((state: any) => {
      setOnline(state.isConnected);
    });
  }, [])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routeNames.splash} screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colorPalettes.cultured } }}>

          <Stack.Screen name={routeNames.splash} component={Splash} />
          <Stack.Screen name={routeNames.auth.login} component={Login} />
          <Stack.Screen name={routeNames.home} component={Home} />
          <Stack.Screen name={routeNames.detail} component={Detail} />

        </Stack.Navigator>
      </NavigationContainer>
      {!isOnline &&
        <OnlineOffline />
      }
    </>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import { colorPalettes, routeNames } from './src/config/Constants';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routeNames.auth.login} screenOptions={{headerShown:false, contentStyle:{backgroundColor:colorPalettes.cultured}}}>

        <Stack.Screen name={routeNames.auth.login} component={Login} />
        <Stack.Screen name={routeNames.home} component={Home} />
        <Stack.Screen name={routeNames.detail} component={Detail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../pages/Main';
import SplashScreen from '../SplashScreen';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import QRScanView from '../pages/QRScan';
import DLScanPage from '../pages/DLScanPage';
import NotesScreen from '../pages/Notes';

const Stack = createStackNavigator();

const AppContainer = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          initialParams={{item: 12123}}
          options={{}}
        />
      </Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen name="qr-scan" component={QRScanView} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="dl-scan" component={DLScanPage} />
      <Stack.Screen name="notes" component={NotesScreen} />
    </NavigationContainer>
  );
};

export default AppContainer;

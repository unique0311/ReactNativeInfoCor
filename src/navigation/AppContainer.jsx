import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../SplashScreen';

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
    </NavigationContainer>
  );
};

export default AppContainer;

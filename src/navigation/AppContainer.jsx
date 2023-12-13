import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();

const AppContainer = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen
          name="Splash"
          component={}
          initialParams={{ item: 12123 }}
          options={{}}     
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
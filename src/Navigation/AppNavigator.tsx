import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();

const options = { headerShown: false };

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen name="App" component={MainNavigation} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

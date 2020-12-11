import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Countries from "src/Features/Countries";
import History from "src/Features/History";
import Support from "src/Features/Support";

const screens = [
  {
    screen: Countries,
    name: "Countries",
    navigationOptions: {
      title: "MainScreen",
    },
  },
  {
    screen: History,
    name: "History",
    navigationOptions: {
      title: "HistoryScreen",
    },
  },
  {
    screen: Support,
    name: "Support",
    navigationOptions: {
      title: "SupportScreen",
    },
  },
];

const options = { headerShown: false };

const Stack = createStackNavigator();

const Screens = () => (
  <Stack.Navigator initialRouteName="Countries">
    {screens.map((item) => (
      <Stack.Screen
        name={item.name}
        component={item.screen}
        key={item.name}
        options={options}
      />
    ))}
  </Stack.Navigator>
);

export default Screens;

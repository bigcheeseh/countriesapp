import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Countries from "src/Features/Countries";
import Country from "src/Features/Country";
import FavoriteCountries from "src/Features/FavoriteCountries";

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
    name: "Country",
    navigationOptions: {
      title: "CountryScreen",
    },
  },
  {
    screen: FavoriteCountries,
    name: "Favorites",
    navigationOptions: {
      title: "FavoritesScreen",
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

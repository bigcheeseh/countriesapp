import React from "react";
import { StyleSheet, GestureResponderEvent } from 'react-native';
import CountryCard from "src/Common/CountryCard"
import {
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { getShadowStyle } from "src/Common/styles";
import { Country} from "src/Api"

interface RouteParams extends Country {
  isFavorite: boolean;
  onStarPress?(e: GestureResponderEvent): void;
}

const CountryScreen = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>()
  return <CountryCard style={styles.cardContainer} 
          country={route.params} 
          isFavorite={route.params.isFavorite} 
          onStarPress={route.params.onStarPress} />;
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    borderRadius: 4,
    backgroundColor: "#FFF",
    flex: 1,
    padding: 12,
    flexDirection: "row",
    ...getShadowStyle()
  },
});

export default CountryScreen;

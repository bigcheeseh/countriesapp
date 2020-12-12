import React, { useContext } from "react";
import { StyleSheet, GestureResponderEvent } from 'react-native';
import CountryCard from "src/Common/CountryCard"
import {
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { getShadowStyle } from "src/Common/styles";
import { Country} from "src/Api"
import { FavoriteCountries } from "src/Context/FavoriteCountries"

interface RouteParams extends Country {
  isFavorite: boolean;
  onStarPress?(e: GestureResponderEvent): void;
}

const CountryScreen = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>()
  const favorite = useContext(FavoriteCountries);


  return <CountryCard 
            style={styles.cardContainer} 
            country={route.params} 
            isFavorite={favorite.countryCodes.includes(route.params.alpha2Code)} 
            onStarPress={favorite.setCountryCode!(route.params.alpha2Code)} />;
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

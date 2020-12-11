import React from "react";
import { StyleSheet } from 'react-native';
import CountryCard from "src/Common/CountryCard"
import {
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { getShadowStyle } from "src/Common/styles";
import { Country} from "src/Api"

const CountryScreen = () => {
  const route = useRoute<RouteProp<{ country: Country}, "country">>()
  return <CountryCard style={styles.cardContainer} country={route.params}/>;
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

import React, { useContext } from "react";
import { Text, StyleSheet, GestureResponderEvent } from 'react-native';
import CountryCard from "src/Common/CountryCard"
import {
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { getShadowStyle } from "src/Common/styles";
import { Country} from "src/Api"
import { FavoriteCountries } from "src/Context/FavoriteCountries"
import TextParagraph from "src/Common/TextParagraph"

interface RouteParams extends Country {
  isFavorite: boolean;
  onStarPress?(e: GestureResponderEvent): void;
}

type TranslationsKeys = keyof Country["translations"]

const CountryScreen = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>()
  const favorite = useContext(FavoriteCountries);


  return (<CountryCard 
            style={styles.cardContainer} 
            country={route.params} 
            isFavorite={favorite.countryCodes.includes(route.params.alpha2Code)} 
            onStarPress={favorite.setCountryCode!(route.params.alpha2Code)}>
              <>
                <TextParagraph label="population"><Text>{route.params.population}</Text></TextParagraph>
                <TextParagraph label="languages" style={styles.multiContentParagraph}>
                  {route.params.languages.map((language) => <Text key={language.name} style={styles.text}>{language.name}</Text>)}
                </TextParagraph>
                <TextParagraph label="translations" style={styles.multiContentParagraph}>
                  {Object.keys(route.params.translations).map((key) => (
                      <Text key={key} style={styles.text}>
                        {route.params.translations[key as TranslationsKeys]}
                      </Text>
                    )
                  )}
                </TextParagraph>
               </>
          </CountryCard>)
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    borderRadius: 4,
    backgroundColor: "#FFF",
    flex: 1,
    padding: 12,
    ...getShadowStyle()
  },
  multiContentParagraph: {flexDirection: "row", flexWrap: "wrap"},
  text: { marginRight: 4 },
});

export default CountryScreen;

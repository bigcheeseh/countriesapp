import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import { backgroundColor, getShadowStyle } from "src/Common/styles";
import TextParagraph from "src/Common/TextParagraph";
import { FavoriteCountries } from "src/Context/FavoriteCountries";

interface RouteParams extends Country {}

type TranslationsKeys = keyof Country["translations"];

const CountryScreen = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const favorite = useContext(FavoriteCountries);

  return (
    <CountryCard
      style={styles.cardContainer}
      country={route.params}
      isFavorite={favorite.countryCodes.includes(route.params.alpha2Code)}
      onStarPress={favorite.setCountryCode!(route.params.alpha2Code)}>
      <>
        <TextParagraph label="population">
          <Text>{route.params.population}</Text>
        </TextParagraph>
        <TextParagraph label="languages" style={styles.multiContentParagraph}>
          {route.params.languages.map((language) => (
            <Text key={language.name} style={styles.text}>
              {language.name}
            </Text>
          ))}
        </TextParagraph>
        <TextParagraph
          label="translations"
          style={styles.multiContentParagraph}>
          {Object.keys(route.params.translations).map((key) => (
            <Text key={key} style={styles.text}>
              {route.params.translations[key as TranslationsKeys]}
            </Text>
          ))}
        </TextParagraph>
      </>
    </CountryCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 16,
    borderRadius: 4,
    backgroundColor,
    flex: 1,
    padding: 12,
    ...getShadowStyle(),
  },
  multiContentParagraph: { flexDirection: "row", flexWrap: "wrap" },
  text: { marginRight: 4 },
});

export default CountryScreen;

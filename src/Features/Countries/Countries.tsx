import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, ActivityIndicator } from "react-native";
import Api, { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import { getShadowStyle } from "src/Common/styles";


const getKey = (item: Country) => String(item.name);

interface Props {
  isFavoriteCountriesList?: boolean
}

const Countries = (props: Props) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [favoriteCountryCodes, setFavoriteCountryCode] = useState<Country["alpha2Code"][]>([]);

  useEffect(() => {
    const setCountriesAsync = async () => {
      const newCountries = await Api.getCountries();
      setCountries(newCountries); 
    };
    setCountriesAsync();

    const setFavoriteCountryCodesAsync = async () => {
      const favCountryCodes = await AsyncStorage.getItem("favoriteCountryCodes") || [];
      setFavoriteCountryCode(JSON.parse(favCountryCodes)); 
    };
    setFavoriteCountryCodesAsync();
  }, []);



  const handleSetFavoriteCountryCode = (code: Country["alpha2Code"]) => () => {
    if (favoriteCountryCodes.includes(code)) {
      setFavoriteCountryCode((favCountries) =>
        favCountries.filter((countryCode) => countryCode !== code),
      );
      return;
    }
    setFavoriteCountryCode((favCountries) => {
      return [...favCountries, code]
    });
    
    return;
  };

  useEffect(() => {
    AsyncStorage.setItem("favoriteCountryCodes", JSON.stringify(favoriteCountryCodes))
  }, [favoriteCountryCodes])

  const renderCountry = (listItem: ListRenderItemInfo<Country>) => {
    const country = listItem.item;
    const isFavorite = favoriteCountryCodes.includes(country.alpha2Code)
    if(props.isFavoriteCountriesList && !isFavorite) return;
    return (
      <CountryCard
        key={country.alpha3Code}
        onStarPress={handleSetFavoriteCountryCode(country.alpha2Code)}
        style={styles.cardContainer}
        country={country}
        isFavorite={isFavorite}
      />
    );
  };

  const CountriesList = useMemo(
    () => (
      <FlatList
        style={styles.container}
        data={countries}
        keyExtractor={getKey}
        renderItem={renderCountry}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
      />
    ),
    [countries, favoriteCountryCodes],
  );
  if(!countries) {
    return <ActivityIndicator />
  }
  return CountriesList;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },

  scrollView: {
    backgroundColor: "#FFF",
  },

  cardContainer: {
    margin: 2,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor: "#FFF",
    flex: 1,
    padding: 12,
    flexDirection: "row",
    ...getShadowStyle(4),
  },
});

export default Countries;

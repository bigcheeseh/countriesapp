import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import Api, { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import { getShadowStyle, themeColor } from "src/Common/styles";


const getKey = (item: Country) => String(item.name);

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [favoriteCountriesIds, setFavoriteCountriesId] = useState<number[]>([]);

  useEffect(() => {
    const setCountriesAsync = async () => {
      const newCountries = await Api.getCountries();
      setCountries(newCountries);
      
    };
    setCountriesAsync();
  }, []);



  const handleSetFavoritesEventId = (id: number) => () => {
    if (favoriteCountriesIds.includes(id)) {
      setFavoriteCountriesId((favCountries) =>
        favCountries.filter((eventId) => eventId !== id),
      );
      return;
    }
    setFavoriteCountriesId((favCountries) => [...favCountries, id]);
    return;
  };

  const renderCountry = (listItem: ListRenderItemInfo<Country>) => {
    const country = listItem.item;

    return (
      <CountryCard
        key={country.name}
        style={styles.cardContainer}
        label={country.name}
        description={country.region}
        position={country.latlng}
        countryCode={country.alpha2Code}
        flagUri={country.flag}
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
    [countries],
  );

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
    borderLeftWidth: 8,
    borderLeftColor: themeColor,
    ...getShadowStyle(4),
  },
});

export default Countries;

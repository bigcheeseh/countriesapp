import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from "react-native";
import Api, { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import SearchBar from "src/Common/SearchBar";
import { backgroundColor, getShadowStyle, themeColor } from "src/Common/styles";
import { FavoriteCountries } from "src/Context/FavoriteCountries";


interface Props {
  isFavoriteCountriesList?: boolean;
}

const getKey = (item: Country) => String(item.alpha3Code);

const Countries = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>();
  const [searchString, setSearchString] = useState<string | undefined>();
  const [countriesToRender, setCountriesToRender] = useState<Country[]>([]);

  const favorite = useContext(FavoriteCountries);
  useEffect(() => {
    const setCountriesAsync = async () => {
      const newCountries = await Api.getCountries();
      setCountries(newCountries);
    };
    setCountriesAsync();
  }, []);

  useEffect(() => {
    if(!countries) { return; }
    const filteredCountries: Country[] = [];
    countries.forEach((country) => {
      if (props.isFavoriteCountriesList && !favorite.countryCodes.includes(country.alpha2Code)) {
        return;
      }
      if (
        searchString &&
        searchString.length > 1 &&
        !country.name.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return;
      }
      filteredCountries.push(country);
    });
    setCountriesToRender(filteredCountries);
  }, props.isFavoriteCountriesList ? [countries, favorite.countryCodes, searchString] : [countries, searchString]);

  const renderCountry = (listItem: ListRenderItemInfo<Country>) => {
    const country = listItem.item;
    return (
      <CountryCard
        key={country.alpha3Code}
        style={styles.cardContainer}
        country={country}
      />
    );
  };

  const CountriesList = useMemo(() => {
    return (
      <FlatList
        stickyHeaderIndices={[0]}
        style={styles.container}
        ListHeaderComponent={
          <SearchBar
            searchString={searchString}
            setSearchString={setSearchString}
          />
        }
        data={countriesToRender}
        keyExtractor={getKey}
        renderItem={renderCountry}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [countriesToRender]);

  if (!countries) {
    return <ActivityIndicator style={styles.spinner} color={themeColor} />;
  }

  return CountriesList;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  spinner: { height: 64 },
  scrollView: {
    backgroundColor,
  },

  cardContainer: {
    margin: 2,
    marginBottom: 32,
    borderRadius: 4,
    backgroundColor,
    flex: 1,
    padding: 12,
    ...getShadowStyle(4),
  },
});

export default Countries;

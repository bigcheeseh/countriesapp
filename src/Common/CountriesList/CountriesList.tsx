
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import Api, { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import SearchBar from "src/Common/SearchBar";
import { getShadowStyle } from "src/Common/styles";
import { FavoriteCountries } from "src/Context/FavoriteCountries";


const getKey = (item: Country) => String(item.alpha3Code);

interface Props {
  isFavoriteCountriesList?: boolean;
}

const LIMIT = 10;

const Countries = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchString, setSearchString] = useState<string | undefined>();
  const [countriesLimit, setCountriesLimit] = useState(LIMIT);
  const [countriesToRender, setCountriesToRender] = useState<Country[]>([]);

  const favorite = useContext(FavoriteCountries);
  useEffect(() => {
    const setCountriesAsync = async () => {
      const newCountries = await Api.getCountries();
      setCountries(newCountries);
    };
    setCountriesAsync();
  }, []);


  useEffect(
    () => {
      setCountriesToRender([]);
      const filteredCountries: Country[] = [];
      let index = 0;
      countries.forEach((country) => {
        const isFavorite = favorite.countryCodes.includes(country.alpha2Code);
        if(props.isFavoriteCountriesList && !isFavorite) { return; }
        if(searchString && searchString.length > 1 && !country.name.toLowerCase().includes(searchString.toLowerCase())) { return; }
        if(index >= countriesLimit) { return; }
        index++;
        filteredCountries.push(country);
      });
      setCountriesToRender(filteredCountries);
    },
    [countries, favorite.countryCodes, searchString, countriesLimit],
  );


  const renderCountry = (listItem: ListRenderItemInfo<Country>) => {
    const country = listItem.item;
    const isFavorite = favorite.countryCodes.includes(country.alpha2Code);
    return (
      <CountryCard
        key={country.alpha3Code}
        onStarPress={favorite.setCountryCode!(country.alpha2Code)}
        style={styles.cardContainer}
        country={country}
        isFavorite={isFavorite}
      />
    );
  };

  const handleSetLimit = () => setCountriesLimit((currentLimit: number) => currentLimit + LIMIT);


  const CountriesList = useMemo(
    () => {
      return(
        <FlatList
          stickyHeaderIndices={[0]}
          style={styles.container}
          ListHeaderComponent={<SearchBar searchString={searchString} setSearchString={setSearchString}/>}
          data={countriesToRender}
          keyExtractor={getKey}
          renderItem={renderCountry}
          showsVerticalScrollIndicator={false}
          onEndReached={handleSetLimit}
        />
    );},
    [countriesToRender],
  );


  if(!countriesToRender) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {CountriesList}
    </>);
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
    ...getShadowStyle(4),
  },
});

export default Countries;


import React, { useEffect, useMemo, useState, useContext } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, ActivityIndicator, TextInput, View, Text } from "react-native";
import Api, { Country } from "src/Api";
import CountryCard from "src/Common/CountryCard";
import { getShadowStyle, themeColor } from "src/Common/styles";
import { FavoriteCountries } from "src/Context/FavoriteCountries"


const getKey = (item: Country) => String(item.name);

interface Props {
  isFavoriteCountriesList?: boolean
}

const Countries = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchString, setSearchString] = useState<string | undefined>();
  const [limit, setLimit] = useState(10);
  const [countriesToRender, setCountriesToRender] = useState<Country[]>([]);

  const favorite = useContext(FavoriteCountries);

  useEffect(() => {
    const setCountriesAsync = async () => {
      const newCountries = await Api.getCountries();
      setCountries(newCountries); 
    };
    setCountriesAsync();;
  }, []);


  useEffect(
    () => {
      setCountriesToRender([]);
      countries.forEach((country) => {
        const isFavorite = favorite.countryCodes.includes(country.alpha2Code)
        if(props.isFavoriteCountriesList && !isFavorite) return;
        if(searchString && searchString.length > 1 && !country.name.toLowerCase().includes(searchString.toLowerCase())) return;
        setCountriesToRender((countries) => [...countries, country])
      });
    },
    [countries, favorite.countryCodes, searchString],
  );


  const renderCountry = (listItem: ListRenderItemInfo<Country>) => {
    const country = listItem.item;
    const index = listItem.index;
    if(index > limit) return null;
    const isFavorite = favorite.countryCodes.includes(country.alpha2Code)
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

  const CountriesList = useMemo(
    () => {
      return(
        <FlatList
          stickyHeaderIndices={[0]}
          style={styles.container}
          ListHeaderComponent={(
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 16, paddingHorizontal: 12, backgroundColor: "#FFF", borderColor: themeColor, borderWidth: 1, borderRadius: 8, ...getShadowStyle(8) }}>
              <View><Text>Search: </Text></View>
              <TextInput style={{height: 50, flex: 4, }} onChangeText={setSearchString} value={searchString}/>
            </View>)}
          data={countriesToRender}
          extraData={[countries, favorite.countryCodes, searchString, limit]}
          keyExtractor={getKey}
          renderItem={renderCountry}
          showsVerticalScrollIndicator={false}
          initialNumToRender={3}
          onEndReachedThreshold={0.5}
          onEndReached={() => setLimit((limit: number) => limit+= 10)}
        />
    )},
    [countriesToRender, limit],
  );


  if(!countriesToRender) {
    return <ActivityIndicator />
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
    flexDirection: "row",
    ...getShadowStyle(4),
  },
});

export default Countries;

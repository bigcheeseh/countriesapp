import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Country } from "src/Api";


interface Props {
  children: JSX.Element | JSX.Element[] | null;
}

export const FavoriteCountries = React.createContext<{countryCodes: string[], setCountryCode?(code: string): () => void;}>({countryCodes: [], setCountryCode: undefined});

const FavoriteCountriesWrapper = (props: Props) => {
  const [favoriteCountryCodes, setFavoriteCountryCode] = useState<Country["alpha2Code"][]>([]);

  useEffect(() => {
    const setFavoriteCountryCodesAsync = async () => {
      const favCountryCodes = (await AsyncStorage.getItem("favoriteCountryCodes") || []) as string;
      setFavoriteCountryCode(JSON.parse(favCountryCodes) as string[]); 
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
      return [...favCountries, code];
    });
    
    return;
  };

  useEffect(() => {
    AsyncStorage.setItem("favoriteCountryCodes", JSON.stringify(favoriteCountryCodes));
  }, [favoriteCountryCodes]);

  return (
    <FavoriteCountries.Provider value={{ countryCodes: favoriteCountryCodes, setCountryCode: handleSetFavoriteCountryCode }}>
      {props.children}
    </FavoriteCountries.Provider>
  );
};

export default FavoriteCountriesWrapper;

import {
  NavigationState,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { backgroundColor, getShadowStyle } from "src/Common/styles";
import MapMarker from "src/Icons/MapMarker";
import Star from "src/Icons/Star";
import NavigationButton from "./NavigationButton";

const NavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route as typeof route & { state?: NavigationState };

  const navigateToCountriesScreen = () => {
    navigate("Countries");
  };

  const navigateToFavoritesScreen = () => {
    navigate("Favorites");
  };

  const navigate = (routeName: string): void => {
    navigation.navigate(routeName, undefined);
  };

  const getRoute = (navState?: NavigationState) => {
    if (!navState) {
      return;
    }
    return navState.routes[navState.index].name;
  };

  const isActive = (routeName: string): boolean => {
    const currentRouteName = getRoute(currentRoute.state) || "Countries";
    return routeName === currentRouteName;
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <NavigationButton
          handlePress={navigateToCountriesScreen}
          isActive={isActive("Countries")}
          label="Countries"
          Icon={MapMarker}
        />
        <NavigationButton
          handlePress={navigateToFavoritesScreen}
          isActive={isActive("Favorites")}
          label="Favorites"
          Icon={Star}
        />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor,
    ...getShadowStyle(4),
  },
});

export default NavigationBar;

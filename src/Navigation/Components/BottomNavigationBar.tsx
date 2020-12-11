import {
  NavigationState,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import History from "src/Icons/History";
import House from "src/Icons/House";
import Support from "src/Icons/Support";
import NavigationButton from "./NavigationButton";

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route as typeof route & { state?: NavigationState };

  const navigateToScheduleScreen = () => {
    navigate("Countries");
  };
  const navigateToHistoryScreen = () => {
    navigate("History");
  };
  const navigateToSettingsScreen = () => {
    navigate("Support");
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
            handlePress={navigateToScheduleScreen}
            isActive={isActive("Countries")}
            label="Countries"
            Icon={House}
          />
          <NavigationButton
            handlePress={navigateToHistoryScreen}
            isActive={isActive("History")}
            label="History"
            Icon={History}
          />
          <NavigationButton
            handlePress={navigateToSettingsScreen}
            isActive={isActive("Support")}
            label="Support"
            Icon={Support}
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
    backgroundColor: "#FFF",
  },
});

export default BottomNavigationBar;

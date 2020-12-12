import React from "react";
import { StatusBar } from "react-native";
import Notification from "src/Common/Notification/Notification";
import { backgroundColor} from "src/Common/styles";
import FavoriteCountries from "src/Context/FavoriteCountries";
import NavigationBar from "./Components/NavigationBar";
import Screens from "./Screens";

const MainNavigation = () => {
  return (
    <FavoriteCountries>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor}/>
      <Notification>
        <NavigationBar />
        <Screens />
      </Notification>
    </FavoriteCountries>
  );
};

export default MainNavigation;

import React from "react";
import NavigationBar from "./Components/NavigationBar";
import Screens from "./Screens";
import FavoriteCountries from "src/Context/FavoriteCountries"
import Notification from "src/Common/Notification/Notification"
import { StatusBar } from 'react-native';
import { backgroundColor} from "src/Common/styles"

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

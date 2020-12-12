import React from "react";
import NavigationBar from "./Components/NavigationBar";
import Screens from "./Screens";
import FavoriteCountries from "src/Context/FavoriteCountries"
import Notification from "src/Common/Notification/Notification"

const MainNavigation = () => {
  return (
    <FavoriteCountries>
      <Notification>
        <NavigationBar />
        <Screens />
      </Notification>
    </FavoriteCountries>
  );
};

export default MainNavigation;

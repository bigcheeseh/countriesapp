import React from "react";
import BottomNavigationBar from "./Components/BottomNavigationBar";
import Screens from "./Screens";
import FavoriteCountries from "src/Context/FavoriteCountries"
import Notification from "src/Common/Notification/Notification"

const MainNavigation = () => {
  return (
    <FavoriteCountries>
      <Notification />
      <Screens />
      <BottomNavigationBar />
    </FavoriteCountries>
  );
};

export default MainNavigation;

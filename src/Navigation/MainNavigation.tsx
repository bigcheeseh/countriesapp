import React from "react";
import BottomNavigationBar from "./Components/BottomNavigationBar";
import Screens from "./Screens";
import FavoriteCountries from "src/Context/FavoriteCountries"

const MainNavigation = () => {
  return (
    <FavoriteCountries>
      <Screens />
      <BottomNavigationBar />
    </FavoriteCountries>
  );
};

export default MainNavigation;

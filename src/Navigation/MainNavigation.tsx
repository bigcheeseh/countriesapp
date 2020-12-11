import * as React from "react";
import BottomNavigationBar from "./Components/BottomNavigationBar";
import Screens from "./Screens";

const MainNavigation = () => {
  return (
    <>
      <Screens />
      <BottomNavigationBar />
    </>
  );
};

export default MainNavigation;

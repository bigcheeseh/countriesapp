import { Platform } from "react-native";

export const getShadowStyle =  (
  shadowSize: number = 4,
  shadowColor: string = "#CCC",
) => {
  const zIndex = shadowSize * 100;
  if (Platform.OS === "android") { return { elevation: shadowSize, zIndex }; }
  return {
    shadowColor,
    shadowOffset: { width: 0, height: shadowSize / 2 },
    shadowOpacity: 0.8,
    shadowRadius: shadowSize,
    zIndex,
  };
};

export const themeColor = "#009ACD";
export const favoriteColor = "#ffd27d"; 
export const backgroundColor = "#fff";
export const errorColor = "#ff3333";
export const unActiveColor = "#B4B8B4";
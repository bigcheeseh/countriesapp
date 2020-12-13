import { Platform } from "react-native";

export const shadowColor = "#CCC";
export const themeColor = "#009ACD";
export const themeShadowColor = "#009ACD88";
export const favoriteColor = "#ffd27d";
export const backgroundColor = "#fff";
export const errorColor = "#ff3333";
export const errorShadowColor = "#ff333388";
export const unActiveColor = "#B4B8B4";

export const getShadowStyle = (
  size: number = 4,
  color: string = shadowColor,
) => {
  const zIndex = size * 100;
  if (Platform.OS === "android") {
    return { elevation: size, zIndex };
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: size / 2 },
    shadowOpacity: 0.8,
    shadowRadius: size,
    zIndex,
  };
};



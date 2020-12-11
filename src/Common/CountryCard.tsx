
import React from "react";
import { Animated, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Star from "src/Icons/Star";
import Thumbnail from "./FlagImage";



interface Props {
  style: ViewStyle;
  position: number[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  isFavorite?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
  address?: string;
  countryCode: string;
  flagUri: string;
  onStarPress?(e: GestureResponderEvent): void;
}

const EventCard = (props: Props) => {
  const [mapHeight] = React.useState(new Animated.Value(0));
  const [isActive, setIsActive] = React.useState(false);
  const { style } = props;
  
  const animateToggleCard = () => {
      if(!isActive) {
        setIsActive(true);
        Animated.timing(mapHeight, {
          toValue: 350,
          useNativeDriver: false, 
          duration: 200,
        }).start();
        return;
      }
    
      Animated.timing(mapHeight, {
        toValue: 0,
        useNativeDriver: false, 
        duration: 200,
      }).start(() => {
        setIsActive(false);
      });
  };
  
  const Card = React.useMemo(() => {
    console.log(props.label, props.countryCode)
    return (
      <View style={style}>
        <View style={styles.container}>
          <TouchableOpacity  onPress={animateToggleCard} style={styles.textAndStarContainer}>
            <TouchableOpacity onPress={props.onStarPress}>
              <Star color={props.isFavorite ? "#ffd27d" : "#fff"}/>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text>{props.label}</Text>
              <Text>{props.description}</Text>
            </View>
          </TouchableOpacity>
          <Thumbnail countryCode={props.countryCode} logoUri={props.flagUri}/>
        </View>
      </View>
    );
  }, [isActive, props.isFavorite]);

  return Card;
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textAndStarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginHorizontal: 12,
  },
  mapContainer: {flex: 1, marginTop: 12 }
});

export default EventCard;

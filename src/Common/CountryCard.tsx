
import React from "react";
import { Animated, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Star from "src/Icons/Star";
import FlagImage from "./FlagImage";
import { Country} from "src/Api"


interface Props {
  style: ViewStyle;
  country: Country;
  isFavorite?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
  onStarPress?(e: GestureResponderEvent): void;
}

type TranslationsKeys = keyof Country["translations"]

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
    return (
      <View style={style}>
            <View style={styles.textContainer}>
              <Text>{props.country.name}</Text>
              <Text>{props.country.nativeName}</Text>
              <Text>{props.country.capital}</Text>
              <Text>{props.country.timezones}</Text>
              <Text>{props.country.population}</Text>
              <Text style={{flexDirection: "row"}}>{props.country.languages.map((language) => <Text key={language.name} style={{ marginRight: 4 }}>{language.name}</Text>)}</Text>
              <Text style={{flexDirection: "row"}}>{Object.keys(props.country.translations).map((key) => <Text key={key} style={{ marginRight: 4 }}>{props.country.translations[key as TranslationsKeys]}</Text>)}</Text>
            </View>
          <View style={{alignItems: "flex-end", justifyContent: "space-between", flex: 1}}>
            <TouchableOpacity onPress={props.onStarPress}>
              <Star color={props.isFavorite ? "#ffd27d" : "#fff"}/>
            </TouchableOpacity>
            <FlagImage countryCode={props.country.alpha2Code} logoUri={props.country.flag}/>
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
    flex: 2,
  },
  mapContainer: {flex: 1, marginTop: 12 }
});

export default EventCard;

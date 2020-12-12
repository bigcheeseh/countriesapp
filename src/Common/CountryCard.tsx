
import {
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Country } from "src/Api";
import { backgroundColor, favoriteColor } from "src/Common/styles";
import TextParagraph from "src/Common/TextParagraph";
import Star from "src/Icons/Star";
import FlagImage from "./FlagImage";

interface Props {
  style: ViewStyle;
  country: Country;
  isFavorite?: boolean;
  children?: JSX.Element | JSX.Element[] | null;
  onStarPress?(e: GestureResponderEvent): void;
}

const EventCard = (props: Props) => {
  const navigation = useNavigation();
  const { style } = props;
  const handleNavigate = () => navigation.navigate("Country", { ...props.country });
  const Card = React.useMemo(() => {
    return (
      <View style={style}>
            <View style={styles.headerContainer}>
              <View>
                <TouchableOpacity onPress={handleNavigate}>
                  <Text style={styles.header}>{props.country.name}</Text>
                  <Text style={styles.subHeader}>{props.country.nativeName}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flagContainer}>
                <FlagImage countryCode={props.country.alpha2Code} logoUri={props.country.flag}/>
                <TouchableOpacity onPress={props.onStarPress}>
                  <Star color={props.isFavorite ? favoriteColor : backgroundColor}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentContainer}>
                <TextParagraph label="capital"><Text>{props.country.capital}</Text></TextParagraph>
                <TextParagraph label="timezones" style={styles.multiContentParagraph}>
                  {props.country.timezones.map((timezone) => 
                    <Text key={timezone} style={styles.text}>
                      {timezone}
                    </Text>
                  )}
                </TextParagraph>
                {props.children}
            </View>
      </View>
    );
  }, [props.isFavorite]);

  return Card;
};
const styles = StyleSheet.create({
  header: { fontSize: 18, fontWeight: "bold", marginVertical: 4},
  subHeader: { fontSize: 16, fontWeight: "500", marginVertical: 2},
  multiContentParagraph: {flexDirection: "row", flexWrap: "wrap"},
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: 4,
  },
  flagContainer: {justifyContent: "flex-end", flex: 1, flexDirection: "row"},
  contentContainer: {flexWrap: "wrap", flexDirection: "row"},
  text: { marginRight: 4 }
});

export default EventCard;

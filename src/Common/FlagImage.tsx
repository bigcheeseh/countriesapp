import * as React from "react";
import { ImageStyle, StyleSheet, View } from "react-native";
import Flag from "react-native-flags";
import { SvgXml } from "react-native-svg";

export interface OwnProps {
  countryCode: string;
  style?: ImageStyle;
  flagUri: string;
}

interface Props extends OwnProps {}

// react-native-flags lib doesn't have images for this country codes but get most of the flag images with this lib more efficient
const countriesWithUniqueFlag = [
  "BQ",
  "BV",
  "IO",
  "UM",
  "GF",
  "HM",
  "XK",
  "RE",
  "PM",
  "SX",
  "SJ",
  "GP"
];

const FlagImage = (props: Props) => {
  const [imageXml, setImageXml] = React.useState<string>();
  const [imageViewBox, setImageViewBox] = React.useState<string>();
  React.useEffect(() => {
    const setSvgImageXml = async () => {
      if (!countriesWithUniqueFlag.includes(props.countryCode)) {
        return;
      }
      const image = await fetch(props.flagUri);
      const imageText = await image.text();
      const width = imageText.match(/width=\"(.*?)\"/)![1];
      const height = imageText.match(/height=\"(.*?)\"/)![1];
      setImageViewBox(`0 0 ${width} ${height}`);
      setImageXml(imageText);
    };
    setSvgImageXml();
  }, [props.flagUri]);
  return (
    <View style={styles.container}>
      {imageXml ? (
        <SvgXml
          xml={imageXml}
          width="100%"
          height="100"
          viewBox={imageViewBox}
        />
      ) : (
        <Flag size={64} type="shiny" code={props.countryCode} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    marginHorizontal: 16,
    width: 64,
    height: 64,
  },
});

export default FlagImage;

import * as React from "react";
import {
  ImageStyle,
  StyleSheet,
  View,
} from "react-native";
import Flag from "react-native-flags";
import { SvgXml } from "react-native-svg"

export interface OwnProps {
  countryCode: string;
  style?: ImageStyle;
  logoUri: string;
}

interface Props extends OwnProps {}

const countriesWithUniqueFlag = ["BQ", "BV", "IO", "UM", "GF", "GP", "HM", "XK", "RE", "PM", "SX", "SJ"];

const FlagImage = (props: Props) => {
  const [imageXml, setImageXml] = React.useState<string>();
  const [imageViewBox, setImageViewBox] = React.useState<string>();
  React.useEffect(() => {
    const setSvgImageXml = async() => {
      if(!countriesWithUniqueFlag.includes(props.countryCode)) return;
      const image = await fetch(props.logoUri!)
      const imageText = await image.text();
      const viewBoxMatch = imageText.match(/viewBox=\"(.*?)\"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : null;
      const width = imageText.match(/width=\"(.*?)\"/)![1];
      const height = imageText.match(/height=\"(.*?)\"/)![1];
      setImageViewBox(viewBox ? viewBox : `0 0 ${width} ${height}`)
      console.log(imageText)
      setImageXml(imageText)
    } 
    setSvgImageXml()
  }, [props.logoUri]);
  return (
    <View style={styles.container}>
      {imageXml ? <SvgXml xml={imageXml}  width="100%" height="100" viewBox={imageViewBox} /> : <Flag size={64} type="flat" code={props.countryCode}/>}
    </View>
  );
  }


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    marginHorizontal: 16,
    width: 64,
    height: 64,
  },
});

export default FlagImage;

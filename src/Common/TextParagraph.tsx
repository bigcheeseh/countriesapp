import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

const TextParagraph = (props: {
  style?: ViewStyle;
  label: string;
  children: JSX.Element | JSX.Element[] | null;
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{props.label}</Text>
    <View style={props.style}>{props.children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginHorizontal: 4 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 8,
    textTransform: "capitalize",
  },
});

export default TextParagraph;

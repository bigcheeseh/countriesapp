import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { getShadowStyle, themeColor } from "src/Common/styles";
import Search from "src/Icons/Search";

interface Props {
  searchString?: string;
  setSearchString(text: string): void;
}

const SearchBar = (props: Props) => (
  <View style={styles.container}>
    <View>
      <Search />
    </View>
    <TextInput
      style={styles.textInput}
      onChangeText={props.setSearchString}
      value={props.searchString}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    borderColor: themeColor,
    borderWidth: 1,
    borderRadius: 8,
    ...getShadowStyle(8),
  },
  textInput: { paddingVertical: 16, flex: 4, paddingHorizontal: 4 },
});

export default SearchBar;

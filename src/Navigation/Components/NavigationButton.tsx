import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { themeColor, unActiveColor } from "src/Common/styles";

interface P {
  width: number;
  height: number;
  color: string;
}

interface Props {
  label: string;
  isActive: boolean;
  Icon?: React.ComponentType<P>;
  handlePress(): void;
}

const NavigationButton = (props: Props) => {
    const { handlePress, label, isActive, Icon } = props;
    const textColor = isActive ? themeColor : unActiveColor;
    return (
      <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          {Icon ? <Icon width={16} height={16} color={textColor} /> : null}
        </View>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </TouchableOpacity>
    );
  }


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
  },
  iconContainer: {height: 24},
  label: {
    marginTop: 8,
    minWidth: 80,
    textAlign: "center",
  },
});

export default NavigationButton;

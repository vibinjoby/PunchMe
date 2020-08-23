import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native-appearance";

const FlexiText = (props) => {
  return <Text style={[props.style, getStyle(props)]}>{props.text}</Text>;
};

const getStyle = (props) => {
  const context = React.createContext();
  const systemTheme = useColorScheme();
  const themeColor =
    context.theme === "systemTheme" ? systemTheme : context.theme;
  let color = themeColor === "light" ? "#000000" : "#ffffff";
  if (props.noColorChange) {
    color = props.color;
  }

  return {
    color: color,
    fontFamily:
      props.fontFamily === "Bold"
        ? "ProximaNovaAltBold"
        : "ProximaNovaAltLight",
    fontSize: props.fontSize,
  };
};

export default FlexiText;

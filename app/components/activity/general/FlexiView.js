import React, { useContext } from "react";
import { View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import AppThemeContext from "../../../context/AppThemeContext";

const FlexiView = (props) => {
  return <View style={[props.style, getStyle(props)]}>{props.children}</View>;
};

const getStyle = (props) => {
  const context = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    context.theme === "systemTheme" ? systemTheme : context.theme;

  let backgroundColor = [];
  const layoutType = props.layoutType;
  if (layoutType == 1) {
    backgroundColor.push("#1A1A1A");
    backgroundColor.push("#232F34");
  } else if (layoutType == 2) {
    backgroundColor.push("#1A1A1A");
    backgroundColor.push("#FFFFFF");
  } else {
    backgroundColor.push("#000000");
    backgroundColor.push("#EEEEEE");
  }

  console.log("======== Theme ===== " + themeColor);
  const color =
    themeColor === "light" ? backgroundColor[1] : backgroundColor[0];
  console.log("======== Color ===== " + color);
  return {
    backgroundColor: color,
  };
};

export default FlexiView;

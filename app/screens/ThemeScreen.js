import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import AppThemeContext from "../context/AppThemeContext";
import routes from "../navigation/routes";
import { useColorScheme } from "react-native-appearance";

export default function ThemeScreen({ navigation }) {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const themeCtx = useContext(AppThemeContext);
  const data = [
    { name: "Dark", value: "dark" },
    { name: "Light", value: "light" },
    { name: "System Preference", value: "systemTheme" }
  ];

  const handleThemeSelection = item => {
    themeCtx.updateTheme(item);
    navigation.navigate(routes.SETTINGS);
  };
  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.lightBackground }
      ]}
    >
      {data.map(item => (
        <TouchableOpacity
          onPress={() => handleThemeSelection(item.value)}
          key={item.name}
        >
          <Text
            style={[
              styles.text,
              themeColor === "light" && { color: colors.black }
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: colors.white
  }
});

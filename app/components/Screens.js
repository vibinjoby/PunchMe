import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Constants from "expo-constants";
import React, { useContext } from "react";
import { useColorScheme } from "react-native-appearance";

import AppThemeContext from "../context/AppThemeContext";
import colors from "../config/colors";

function Screens({ children, style }) {
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return (
    <>
      <StatusBar
        barStyle={themeColor === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView
        style={[
          styles.screen,
          style,
          themeColor === "light" && { backgroundColor: colors.lightBackground }
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.black
  }
});

export default Screens;

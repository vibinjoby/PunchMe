import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import Constants from "expo-constants";

import React from "react";

function Screens({ children, style }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "black"
  }
});

export default Screens;

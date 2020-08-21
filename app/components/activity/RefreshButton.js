import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import useFonts from "expo-font";

const RefreshButton = (title, onPress) => {
  let [fontLoaded] = useFonts({
    ProximaNovaAltLight: require("../../assets/fonts/Proxima-Nova-Alt-Light.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.refreshButtonContainer}>
      <Text style={styles.refreshButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  refreshButtonContainer: {
    backgroundColor: "#000000",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  refreshButtonTitle: {
    fontFamily: "ProximaNovaAltLight",
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default RefreshButton;

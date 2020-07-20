import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import FontLoad from "./FontLoad";

export default function Toolbar(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <View style={styles.toolbar}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    width: "100%",
    backgroundColor: "#1A1A1A",
  },
  title: {
    fontFamily: "ProximaNovaAltBold",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

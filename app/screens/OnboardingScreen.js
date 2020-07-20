import React from "react";

import { View, Text, StyleSheet, Image, Button } from "react-native";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function OnboardingScreen({
  headerTxt,
  subHeaderTxt,
  buttonTxt,
  imageUri,
  onNext,
  onStart,
}) {
  return (
    <View style={styles.container}>
      <Image source={imageUri} />
      <Text style={styles.headerTxt}>{headerTxt}</Text>
      <Text style={styles.subHeaderTxt}>{subHeaderTxt}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={buttonTxt === "Next" ? onNext : onStart}
      >
        <Text style={styles.text}>{buttonTxt}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  headerTxt: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 32,
    marginTop: 20,
    marginBottom: 30,
  },
  subHeaderTxt: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 120,
    width: "80%",
    textAlign: "center",
  },
  button: {
    width: 100,
    height: 35,
    backgroundColor: "#4F44FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: colors.white,
  },
});

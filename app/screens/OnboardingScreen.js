import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import { TouchableOpacity } from "react-native";

export default function OnboardingScreen({
  headerTxt,
  imageUri,
  position,
  onNext,
  onPrev,
  onSignIn,
}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={imageUri} />
      <Text style={styles.headerTxt}>{headerTxt}</Text>
      {getButtonView(position, onNext, onPrev, onSignIn)}
    </View>
  );
}

function getButtonView(position, onNext, onPrev, onSignIn) {
  if (position == 1) {
    return (
      <View style={styles.firstPage}>
        <TouchableOpacity onPress={onNext}>
          <Image
            style={styles.imageButton}
            source={require("../assets/ic_next.png")}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (position == 2) {
    return (
      <View style={styles.secondPage}>
        <TouchableOpacity onPress={onPrev}>
          <Image
            style={styles.imageButton}
            source={require("../assets/ic_prev.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext}>
          <Image
            style={styles.imageButton}
            source={require("../assets/ic_next.png")}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.thirdPage}>
        <TouchableOpacity style={styles.button} onPress={onSignIn}>
          <Text style={styles.text}>{"Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  image: {
    width: "100%",
    height: "50%",
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
    height: 40,
    backgroundColor: "#FF4E05",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  imageButton: {
    width: 48,
    height: 48,
  },
  text: {
    color: colors.white,
    fontWeight: "200",
    fontSize: 20,
  },

  firstPage: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "40%",
    paddingRight: 30,
  },
  secondPage: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "40%",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
  },
  thirdPage: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
});

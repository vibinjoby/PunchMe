import React from "react";
import * as Font from "expo-font";

export default function FontLoad() {
  return Font.loadAsync({
    ProximaNovaAltBold: require("../../assets/fonts/Proxima-Nova-Alt-Bold.ttf"),
    ProximaNovaAltLight: require("../../assets/fonts/Proxima-Nova-Alt-Light.ttf"),
  });
}

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FlexiText from "./general/FlexiText";
import FlexiView from "./general/FlexiView";

export default function Toolbar(props) {
  return (
    <FlexiView style={styles.toolbar} layoutType={1}>
      <FlexiText
        style={styles.title}
        text={props.title}
        fontFamily="Bold"
        fontSize={22}
        noColorChange={true}
        color="#ffffff"
      ></FlexiText>
    </FlexiView>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    width: "100%",
    backgroundColor: "#232F34",
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

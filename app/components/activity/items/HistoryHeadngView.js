import React from "react";
import { StyleSheet, Image } from "react-native";
import FlexiText from "../general/FlexiText";
import FlexiView from "../general/FlexiView";

const HistoryHeadingView = (props) => {
  return (
    <FlexiView style={styles.container}>
      <FlexiText
        style={styles.heading}
        text="Work history"
        fontFamily="Bold"
        fontSize={24}
      ></FlexiText>
      <Image
        style={styles.image}
        source={require("../../../assets/icon_search.png")}
      ></Image>
      <Image
        style={styles.image}
        source={require("../../../assets/icon_sort.png")}
      ></Image>
    </FlexiView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingStart: 8,
    paddingEnd: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  heading: {
    flex: 1,
  },

  image: {
    width: 16,
    height: 16,
    margin: 12,
  },
});

export default HistoryHeadingView;

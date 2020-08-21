import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Button, Alert } from "react-native";
import { AppLoading } from "expo";
import FontLoad from "./FontLoad";
import RefreshButton from "./RefreshButton";

export default function EmptyActivity(props) {
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
    <View>
      <Image
        source={require("../../assets/NoJobs/NoJobs.png")}
        style={styles.icon}
      />
      <Text style={styles.message}>{props.message}</Text>
      <Button
        style={styles.refresh}
        title="Refresh"
        onPress={() => {
          props.onPress();
        }}
        color="#ffffff"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  icon: {
    width: 147,
    height: 147,
    alignSelf: "center",
  },

  message: {
    fontFamily: "ProximaNovaAltLight",
    color: "#959698",
    fontSize: 18,
    paddingTop: 20,
  },
  refresh: {
    margin: 20,
    paddingTop: 30,
  },
});

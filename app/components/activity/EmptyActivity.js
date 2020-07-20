import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AppLoading } from "expo";
import FontLoad from "./FontLoad";

export default function EmptyActivity(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
          console.log("-------- Loading Finished ------------");
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
});

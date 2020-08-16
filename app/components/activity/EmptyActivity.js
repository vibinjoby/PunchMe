import React from "react";
import { StyleSheet, View, Image, Text, Button, Alert } from "react-native";

export default function EmptyActivity(props) {
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
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },

  icon: {
    width: 147,
    height: 147,
    alignSelf: "center"
  },

  message: {
    fontFamily: "ProximaNovaAltLight",
    color: "#959698",
    fontSize: 18,
    paddingTop: 20
  },
  refresh: {
    margin: 20,
    paddingTop: 20,
    fontFamily: "ProximaNovaAltLight",
    backgroundColor: "#000000",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: 2
  }
});

import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

export default function NoJobsScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/NoJobs/NoJobs.png")}
        style={styles.noJobsImg}
      />
      <Text style={styles.defaultTxt}>NO JOBS FOUND</Text>
      <Text style={styles.defaultTxt}>
        Click on the add button at the top to add a new job
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  defaultTxt: {
    width: "80%",
    textAlign: "center",
    fontSize: 18,
    color: "#959698",
    marginBottom: 20
  },
  noJobsImg: {
    marginBottom: 20
  }
});

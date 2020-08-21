import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

export default function EmptyTaskComp({ theme }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, theme === "light" && { color: "#969696" }]}>
        You have no scheduled Shifts yet Add Schedules to view them
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 90
  },
  text: {
    width: "90%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white
  }
});

import React from "react";
import { StyleSheet, Text } from "react-native";

export default function CustomErrorText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "red",
    marginBottom: 5
  }
});

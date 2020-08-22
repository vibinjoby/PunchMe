import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.3,
    marginRight: 10,
    borderColor: "grey"
  }
});

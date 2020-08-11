import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../config/colors";

export default function CustomModalButton({ title, bgcolor, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: bgcolor ? bgcolor : "green" }
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8
  },
  text: {
    color: colors.white
  }
});

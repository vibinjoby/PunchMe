import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default function CustomButton({ title, customStyles, onPress }) {
  return (
    <TouchableOpacity style={[styles.loginBtn, customStyles]} onPress={onPress}>
      <Text style={styles.loginBtnTxt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    marginHorizontal: 40,
    marginBottom: 10,
    padding: 15
  },
  loginBtnTxt: {
    textAlign: "center",
    fontWeight: "bold"
  }
});

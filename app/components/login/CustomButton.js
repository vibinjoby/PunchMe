import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import colors from "../../config/colors";

export default function CustomButton({
  title,
  customStyles,
  onPress,
  disabled
}) {
  return !disabled ? (
    <TouchableOpacity style={[styles.loginBtn, customStyles]} onPress={onPress}>
      <Text style={styles.loginBtnTxt}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback style={[styles.disabledBtn, customStyles]}>
      <Text style={styles.disabledTxt}>{title}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    marginBottom: 10,
    padding: 15
  },
  disabledBtn: {
    backgroundColor: "grey",
    borderRadius: 8,
    marginBottom: 10,
    padding: 15
  },
  disabledTxt: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white
  },
  loginBtnTxt: {
    textAlign: "center",
    fontWeight: "bold"
  }
});

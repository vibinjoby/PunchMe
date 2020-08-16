import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import colors from "../../config/colors";
import AppThemeContext from "../../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";

export default function CustomButton({
  title,
  customStyles,
  onPress,
  disabled
}) {
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return !disabled ? (
    <TouchableOpacity style={[styles.loginBtn, customStyles]} onPress={onPress}>
      <Text
        style={[
          styles.loginBtnTxt,
          themeColor === "light" && { color: "white" }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback style={[styles.disabledBtn, customStyles]}>
      <Text
        style={[
          styles.disabledTxt,
          themeColor === "light" && { color: "white" }
        ]}
      >
        {title}
      </Text>
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
    fontFamily: "ProximaNovaBold",
    textAlign: "center",
    color: colors.white
  },
  loginBtnTxt: {
    fontFamily: "ProximaNovaBold",
    textAlign: "center"
  }
});

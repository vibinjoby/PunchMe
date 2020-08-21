import React, { useContext } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import colors from "../../config/colors";
import { useColorScheme } from "react-native-appearance";
import AppThemeContext from "../../context/AppThemeContext";

export default function CustomTextInput({
  onChangeText,
  textHeader,
  customStyles,
  ...otherProps
}) {
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return (
    <View style={customStyles}>
      {textHeader && (
        <Text
          style={[
            styles.formTxt,
            themeColor === "light" && { color: colors.black }
          ]}
        >
          {textHeader}
        </Text>
      )}
      <TextInput
        placeholderTextColor="#A2A2A2"
        style={[
          styles.textInput,
          themeColor === "light" && {
            color: colors.black,
            backgroundColor: colors.white
          }
        ]}
        {...otherProps}
        autoCapitalize="none"
        onChangeText={text => onChangeText && onChangeText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formTxt: {
    fontFamily: "ProximaNovaBold",
    color: colors.white,
    fontSize: 13
  },
  textInput: {
    fontFamily: "ProximaNovaRegular",
    backgroundColor: "#212121",
    color: colors.white,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginTop: 10
  }
});

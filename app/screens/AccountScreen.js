import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import Screens from "../components/Screens";
import colors from "../config/colors";
import AppThemeContext from "../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";

export default function AccountScreen({ navigation: { setParams } }) {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const [title, setTitle] = useState();
  const [hourlyPay, setHourlyPay] = useState();
  const [notes, setNotes] = useState();

  const [isTitleError, setIsTitleErr] = useState(false);
  const [isHourlyPayError, setIsHourlyPayErr] = useState(false);

  const handleErrors = (titleErr, hourlyPayErr) => {
    if (titleErr) setIsTitleErr(true);
    if (hourlyPayErr) setIsHourlyPayErr(true);
  };

  useEffect(() => {
    setParams({ title, hourlyPay, notes, handleErrors });
  }, [title, hourlyPay, notes]);

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.lightBackground }
      ]}
    >
      <Text style={styles.heading}>First Name</Text>
      <TextInput
        onChangeText={text => {
          if (!text) setIsTitleErr(true);
          else setIsTitleErr(false);
          setTitle(text);
        }}
        placeholder="First name"
        style={[
          styles.textInput,
          isTitleError ? styles.errorInput : "",
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black
          }
        ]}
        placeholderTextColor="grey"
      />
      {/** Conditionally render the error */}
      {isTitleError && (
        <Text style={styles.error}>Please Enter First Name</Text>
      )}
      <Text style={styles.heading}>Last Name</Text>
      <TextInput
        onChangeText={text => {
          setHourlyPay(text);
          if (!text) setIsHourlyPayErr(true);
          else setIsHourlyPayErr(false);
        }}
        placeholder="Last Name"
        style={[
          styles.textInput,
          isHourlyPayError ? styles.errorInput : "",
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black
          }
        ]}
        placeholderTextColor="grey"
      />
      {/** Conditionally render the error */}
      {isHourlyPayError && (
        <Text style={styles.error}>Please Valid SLast Name</Text>
      )}
      <Text style={styles.heading}>Email Id</Text>
      <TextInput
        onChangeText={text => setNotes(text)}
        placeholder="Email ID"
        style={[
          styles.textInput,
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black
          }
        ]}
        placeholderTextColor="grey"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  error: {
    marginTop: -10,
    marginLeft: 20,
    marginBottom: 10,
    color: "red"
  },
  textInput: {
    fontFamily: "ProximaNovaRegular",
    backgroundColor: "#1A1A1A",
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    padding: 20
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1
  },
  heading: {
    marginLeft: 10,
    padding: 5
  }
});

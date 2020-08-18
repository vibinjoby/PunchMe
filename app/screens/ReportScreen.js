import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import Screens from "../components/Screens";
import colors from "../config/colors";
import AppThemeContext from "../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";

export default function ReportScreen({ navigation: { setParams } }) {
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
        themeColor === "light" && { backgroundColor: colors.lightBackground },
      ]}
    >
      <Text style={styles.topcontent}>
        Got a question? We’d love to hear from you. Send us a message and we’ll
        respond as soon as possible.
      </Text>
      <Text style={styles.heading}>Name</Text>
      <TextInput
        onChangeText={(text) => {
          if (!text) setIsTitleErr(true);
          else setIsTitleErr(false);
          setTitle(text);
        }}
        style={[
          styles.textInput,
          isTitleError ? styles.errorInput : "",
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black,
          },
        ]}
        placeholderTextColor="grey"
      />
      {/** Conditionally render the error */}
      {isTitleError && (
        <Text style={styles.error}>Please Enter First Name</Text>
      )}
      <Text style={styles.heading}>Email Address</Text>
      <TextInput
        onChangeText={(text) => {
          setHourlyPay(text);
          if (!text) setIsHourlyPayErr(true);
          else setIsHourlyPayErr(false);
        }}
        style={[
          styles.textInput,
          isHourlyPayError ? styles.errorInput : "",
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black,
          },
        ]}
        placeholderTextColor="grey"
      />
      {/** Conditionally render the error */}
      {isHourlyPayError && (
        <Text style={styles.error}>Please Valid Last Name</Text>
      )}
      <Text style={styles.heading}>Message</Text>
      <TextInput
        onChangeText={(text) => setNotes(text)}
        multiline={true}
        style={[
          styles.textMessage,
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black,
          },
        ]}
        placeholderTextColor="grey"
      />
      <Text style={styles.heading}>Add Screenshots</Text>
      <View
        style={[
          styles.img,
          themeColor === "light" && {
            backgroundColor: colors.white,
            color: colors.black,
          },
        ]}
      >
        <Image source={require("../assets/screenshot.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  error: {
    marginTop: -10,
    marginLeft: 20,
    marginBottom: 10,
    color: "red",
  },
  textInput: {
    fontFamily: "ProximaNovaRegular",
    backgroundColor: "#1A1A1A",
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
  },
  textMessage: {
    height: 150,
    fontFamily: "ProximaNovaRegular",
    backgroundColor: "#1A1A1A",
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  heading: {
    marginLeft: 10,
    padding: 5,
  },
  img: {
    height: 150,
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  topcontent: {
    margin: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "center",
  },
});

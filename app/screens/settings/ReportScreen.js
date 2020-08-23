import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";

import colors from "../../config/colors";
import AppThemeContext from "../../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../components/login/CustomButton";

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
        themeColor === "light" && { backgroundColor: colors.lightBackground }
      ]}
    >
      <ScrollView>
        <Text
          style={
            themeColor === "light"
              ? {
                  color: colors.black,
                  margin: 20,
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  textAlign: "center"
                }
              : {
                  color: colors.white,
                  margin: 20,
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  textAlign: "center"
                }
          }
        >
          Got a question? We’d love to hear from you. Send us a message and
          we’ll respond as soon as possible.
        </Text>
        <Text
          style={
            themeColor === "light"
              ? { color: colors.black, marginLeft: 20, padding: 5 }
              : {
                  color: colors.white,
                  marginLeft: 20,
                  padding: 5
                }
          }
        >
          Name
        </Text>
        <TextInput
          onChangeText={text => {
            if (!text) setIsTitleErr(true);
            else setIsTitleErr(false);
            setTitle(text);
          }}
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
        <Text
          style={
            themeColor === "light"
              ? { color: colors.black, marginLeft: 20, padding: 5 }
              : {
                  color: colors.white,
                  marginLeft: 20,
                  padding: 5
                }
          }
        >
          Email Address
        </Text>
        <TextInput
          onChangeText={text => {
            setHourlyPay(text);
            if (!text) setIsHourlyPayErr(true);
            else setIsHourlyPayErr(false);
          }}
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
          <Text style={styles.error}>Please Valid Last Name</Text>
        )}
        <Text
          style={
            themeColor === "light"
              ? { color: colors.black, marginLeft: 20, padding: 5 }
              : {
                  color: colors.white,
                  marginLeft: 20,
                  padding: 5
                }
          }
        >
          Message
        </Text>
        <TextInput
          onChangeText={text => setNotes(text)}
          multiline={true}
          style={[
            styles.textMessage,
            themeColor === "light" && {
              backgroundColor: colors.white,
              color: colors.black
            }
          ]}
          placeholderTextColor="grey"
        />
        <Text
          style={
            themeColor === "light"
              ? { color: colors.black, marginLeft: 20, padding: 5 }
              : {
                  color: colors.white,
                  marginLeft: 20,
                  padding: 5
                }
          }
        >
          Add Screenshots
        </Text>
        <View
          style={[
            styles.img,
            themeColor === "light" && {
              backgroundColor: colors.white,
              color: colors.black
            }
          ]}
        >
          <Image source={require("../../assets/screenshot.png")} />
        </View>
        <CustomButton
          title="Send Message"
          customStyles={{ marginHorizontal: 20 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
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
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 20
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
    padding: 20
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1
  },
  heading: {
    marginLeft: 10,
    padding: 5
  },
  img: {
    height: 150,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  topcontent: {
    margin: 20,
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "center"
  }
});

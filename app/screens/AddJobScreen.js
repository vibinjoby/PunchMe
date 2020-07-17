import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Text } from "react-native";
import Screens from "../components/Screens";
import colors from "../config/colors";

export default function AddJobScreen({ navigation: { setParams } }) {
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
    <Screens style={styles.container}>
      <TextInput
        onChangeText={text => {
          if (!text) setIsTitleErr(true);
          else setIsTitleErr(false);
          setTitle(text);
        }}
        placeholder="Job Title"
        style={[styles.textInput, isTitleError ? styles.errorInput : ""]}
        placeholderTextColor={colors.white}
      />
      {/** Conditionally render the error */}
      {isTitleError && (
        <Text style={styles.error}>Please input a job title </Text>
      )}
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={text => {
          setHourlyPay(text);
          if (!text) setIsHourlyPayErr(true);
          else setIsHourlyPayErr(false);
        }}
        placeholder="Hourly Payment"
        style={[styles.textInput, isHourlyPayError ? styles.errorInput : ""]}
        placeholderTextColor={colors.white}
      />
      {/** Conditionally render the error */}
      {isHourlyPayError && (
        <Text style={styles.error}>Please input a hourly pay</Text>
      )}
      <TextInput
        onChangeText={text => setNotes(text)}
        placeholder="Notes"
        style={styles.textInput}
        placeholderTextColor={colors.white}
      />
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  error: {
    marginTop: -10,
    marginLeft: 20,
    marginBottom: 10,
    color: "red"
  },
  textInput: {
    backgroundColor: "#1A1A1A",
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    padding: 20
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1
  }
});

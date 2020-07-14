import React from "react";
import { StyleSheet } from "react-native";
import Screens from "../components/Screens";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";

export default function AddJobScreen(props) {
  return (
    <Screens style={styles.container}>
      <TextInput
        placeholder="Job Title"
        style={styles.textInput}
        placeholderTextColor={colors.white}
      />
      <TextInput
        placeholder="Hourly Payment"
        style={styles.textInput}
        placeholderTextColor={colors.white}
      />
      <TextInput
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
  textInput: {
    backgroundColor: "#1A1A1A",
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
    padding: 20
  }
});

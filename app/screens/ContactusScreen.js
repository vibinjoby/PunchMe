import { Text, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import colors from "../config/colors";
import AppThemeContext from "../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";

export default function ContactUsScreen() {
  //Theme
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;
  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.white }
      ]}
    >
      <Text
        style={[
          styles.header,
          themeColor === "light" && { color: colors.black }
        ]}
      >
        Get In Touch
      </Text>
      <Text
        style={[
          styles.subcontainer,
          themeColor === "light" && { color: colors.black }
        ]}
      >
        Venom Coders
      </Text>
      <View style={styles.details}>
        <Text
          style={{ color: themeColor === "dark" ? colors.white : colors.black }}
        >
          Email
        </Text>
        <Text
          style={[
            styles.content,
            themeColor === "dark" && { color: colors.white }
          ]}
        >
          Punchme2020@gmail.com
        </Text>
      </View>
      <View style={styles.details}>
        <Text
          style={{ color: themeColor === "dark" ? colors.white : colors.black }}
        >
          Mob
        </Text>
        <Text
          style={[
            styles.content,
            themeColor === "dark" && { color: colors.white }
          ]}
        >
          +16476753056
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  header: {
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: colors.black
  },
  subcontainer: {
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 18,
    color: "white"
  },
  details: {
    flexDirection: "row",
    textAlignVertical: "center",
    margin: "2%",
    padding: "5%",
    fontSize: 15
  },
  content: {
    marginLeft: "5%",
    width: "70%",
    color: colors.black,
    fontSize: 15,
    justifyContent: "space-around",
    borderWidth: 0.5,
    textAlign: "center"
  }
});

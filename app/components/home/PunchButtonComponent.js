import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../config/colors";

export default function PunchButtonComponent({
  onPunchIn,
  onPunchOut,
  onBreak,
  onResume,
  isPunchedIn,
  isBreak,
  theme
}) {
  return (
    <View
      style={[
        styles.container,
        theme === "light" && { backgroundColor: colors.lightBackground }
      ]}
    >
      {!isPunchedIn ? (
        <TouchableOpacity style={styles.punchBtn} onPress={onPunchIn}>
          <Text
            style={[
              styles.punchText,
              theme === "light" && { color: colors.white }
            ]}
          >
            PUNCH IN
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.punchBtn} onPress={onPunchOut}>
          <Text
            style={[
              styles.punchText,
              theme === "light" && { color: colors.white }
            ]}
          >
            PUNCH OUT
          </Text>
        </TouchableOpacity>
      )}

      {!isBreak ? (
        <TouchableOpacity style={styles.breakBtn} onPress={onBreak}>
          <Text
            style={[
              styles.breakTxt,
              theme === "light" && { color: colors.black }
            ]}
          >
            BREAK
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.breakBtn} onPress={onResume}>
          <Text
            style={[
              styles.breakTxt,
              theme === "light" && { color: colors.black }
            ]}
          >
            RESUME
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    justifyContent: "space-around",
    padding: 20
  },
  punchBtn: {
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    padding: 10,
    width: 120,
    marginVertical: 10
  },
  breakBtn: {
    borderColor: "#707070",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    padding: 10,
    width: 120,
    marginVertical: 10
  },
  punchText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    color: colors.black,
    alignSelf: "center"
  },
  breakTxt: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    color: colors.white,
    alignSelf: "center"
  }
});

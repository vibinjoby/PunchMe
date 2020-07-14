import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../../config/colors";

export default function PunchButtonComponent({
  onPunchIn,
  onPunchOut,
  onBreak,
  onResume,
  isPunchedIn,
  isBreak
}) {
  return (
    <View style={styles.container}>
      {!isPunchedIn ? (
        <TouchableOpacity style={styles.punchBtn} onPress={onPunchIn}>
          <Text style={styles.text}>PUNCH IN</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.punchBtn} onPress={onPunchOut}>
          <Text style={styles.text}>PUNCH OUT</Text>
        </TouchableOpacity>
      )}

      {!isBreak ? (
        <TouchableOpacity style={styles.breakBtn} onPress={onBreak}>
          <Text style={styles.text}>BREAK</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.breakBtn} onPress={onResume}>
          <Text style={styles.text}>RESUME</Text>
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
    backgroundColor: "#F93434",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 10,
    width: 120,
    marginVertical: 10
  },
  breakBtn: {
    borderColor: "#707070",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 10,
    width: 120,
    marginVertical: 10
  },
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 15,
    color: colors.white,
    alignSelf: "center"
  }
});

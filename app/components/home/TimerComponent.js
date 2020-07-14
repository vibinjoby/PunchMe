import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function TimerComponent({ timerTime, breakTime }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timerTxt}>
        {timerTime.hour}:{timerTime.minute}:{timerTime.seconds}
      </Text>
      <View style={styles.breakContainer}>
        <Text style={styles.breakTxt}>BREAK</Text>
        <Text style={styles.breakTimer}>
          {breakTime.hour}:{breakTime.minute}:{breakTime.seconds}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  timerTxt: {
    fontSize: 73,
    color: "#FFAA20"
  },
  breakTxt: {
    color: "#C4C4C4",
    fontSize: 13
  },
  breakTimer: {
    color: "#C4C4C4",
    fontSize: 21
  },
  breakContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40
  }
});

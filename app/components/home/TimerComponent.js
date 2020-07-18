import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomBlinkTextComponent from "./CustomBlinkTextComponent";

export default function TimerComponent({
  timerTime,
  breakTime,
  isBreak = false
}) {
  const [isBlink, setIsBlink] = useState(isBreak);

  //Set the blink state to true if the user has taken break and re-render the component for blinking text
  useEffect(() => {
    isBreak ? setIsBlink(true) : setIsBlink(false);
  }, [isBreak]);

  return (
    <View style={styles.container}>
      {/**If the user has taken break, blink the overall timer text else pass the blink and interval period as null */}
      {isBlink ? (
        <CustomBlinkTextComponent
          style={styles.timerTxt}
          blinkPeriod={isBlink ? 1000 : null}
          intervalPeriod={isBlink ? 1000 : null}
        >
          {timerTime.hour}:{timerTime.minute}:{timerTime.seconds}
        </CustomBlinkTextComponent>
      ) : (
        <Text style={styles.timerTxt}>
          {timerTime.hour}:{timerTime.minute}:{timerTime.seconds}
        </Text>
      )}
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

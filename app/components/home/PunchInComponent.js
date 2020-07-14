import React from "react";
import { View, StyleSheet, Text } from "react-native";

export function PunchInComponent({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.punchTxt}>PUNCH IN TIME : </Text>
      <Text style={styles.punchTxt}>{data[0] && data[0].punchInTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  punchTxt: {
    color: "#FFFFFF"
  }
});

export const MemoizedPunchInTimeComp = React.memo(PunchInComponent);

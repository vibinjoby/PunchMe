import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

export function PunchInComponent({ data, theme }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.leftContainer,
          theme === "light" && { backgroundColor: colors.white }
        ]}
      >
        <View
          style={{
            backgroundColor: "green",
            width: 8,
            height: 8,
            borderRadius: 4,
            alignSelf: "flex-end"
          }}
        />
        <Text style={styles.punchTxt}>PUNCH IN </Text>
        <Text style={styles.punchData}>{data}</Text>
      </View>
      <View
        style={[
          styles.rightContainer,
          theme === "light" && { backgroundColor: colors.white }
        ]}
      >
        <View
          style={{
            backgroundColor: "red",
            width: 8,
            height: 8,
            borderRadius: 4,
            alignSelf: "flex-start"
          }}
        />
        <Text style={styles.punchTxt}>PUNCH OUT </Text>
        <Text
          style={[styles.punchData, theme === "light" && { color: "#2E2E2E" }]}
        >
          {data}{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftContainer: {
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "45%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  rightContainer: {
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "45%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  punchTxt: {
    fontSize: 14,
    color: colors.yellow
  },
  punchData: {
    fontSize: 14,
    color: colors.white
  }
});

export const MemoizedPunchInTimeComp = React.memo(PunchInComponent);

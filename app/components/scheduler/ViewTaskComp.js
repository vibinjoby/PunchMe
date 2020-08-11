import React from "react";
import moment from "moment";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default function ViewTaskComp({ item, setSelectedTask, _getEvent }) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedTask(item);
        _getEvent();
      }}
      key={item.key}
      style={styles.taskListContent}
    >
      <View
        style={{
          marginLeft: 13
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: item.color,
              marginRight: 8
            }}
          />
          <Text
            style={{
              color: "#554A4C",
              fontSize: 20,
              fontWeight: "700"
            }}
          >
            {item.title}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20
            }}
          >
            <Text
              style={{
                color: "#BBBBBB",
                fontSize: 14,
                marginRight: 5
              }}
            >{`${moment(item.alarm.time).format("YYYY")}/${moment(
              item.alarm.time
            ).format("MM")}/${moment(item.alarm.time).format("DD")}`}</Text>
            <Text
              style={{
                color: "#BBBBBB",
                fontSize: 14
              }}
            >
              {item.notes}
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.rightBorderView, { backgroundColor: item.color }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#2E66E7",
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rightBorderView: {
    height: 80,
    width: 5,
    backgroundColor: colors.yellow,
    borderRadius: 5
  }
});

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

export default function ViewTaskComp({
  item,
  setSelectedTask,
  _getEvent,
  theme
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedTask(item);
        _getEvent();
      }}
      key={item.key}
      style={[
        styles.taskListContent,
        theme === "light" && { backgroundColor: colors.white }
      ]}
    >
      <View
        style={{
          marginLeft: 13
        }}
      >
        <View style={styles.titleView}>
          <View
            style={[
              styles.leftCircleView /* , { backgroundColor: item.color } */
            ]}
          />
          <Text
            style={[
              styles.titleTxt,
              theme === "light" && { color: colors.black }
            ]}
          >
            {item.title}
          </Text>
        </View>
        <View>
          <View style={styles.notesView}>
            <Text style={styles.notesTxt}>{item.notes}</Text>
          </View>
        </View>
      </View>
      <View
        style={[styles.rightBorderView /* , { backgroundColor: item.color } */]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#fff",
    backgroundColor: "#1A1A1A",
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
    width: 3,
    backgroundColor: "#4B4BF9",
    borderRadius: 5
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center"
  },
  leftCircleView: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#4B4BF9",
    marginRight: 8
  },
  titleTxt: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: "700"
  },
  notesView: {
    alignItems: "center",
    marginLeft: 20
  },
  notesTxt: {
    color: "#BBBBBB",
    fontSize: 14
  }
});

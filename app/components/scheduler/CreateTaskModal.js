import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import uuid from "uuid";
import CustomModalButton from "./CustomModalButton";
import colors from "../../config/colors";
import { Context } from "../../context/Context";

export default function CreateTaskModal({
  isModalVisible,
  onDelete,
  setIsModalVisible,
  selectedDate,
  updateCurrentTask
}) {
  const schedulerContext = useContext(Context);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(
    false
  );
  const [startTime, setStartTime] = useState("00:00 AM");
  const [endTime, setEndTime] = useState("00:00 AM");
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const handleCreateEventData = async () => {
    const creatTodo = {
      key: uuid(),
      date: selectedDate,
      todoList: [
        {
          key: uuid(),
          title: "Task",
          notes: "Notes",
          alarm: {},
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`
        }
      ],
      markedDot: {
        date: selectedDate,
        dots: [
          {
            key: uuid(),
            color: "#2E66E7",
            selectedDotColor: "#2E66E7"
          }
        ]
      }
    };

    await schedulerContext.updateTodo(creatTodo);
    await updateCurrentTask(selectedDate);
    setIsModalVisible(false);
  };

  const handlePickedStartTime = date => {
    const selectedTime = moment(date).format("hh:mm A");
    setStartTime(selectedTime);

    setIsStartTimePickerVisible(false);
  };

  const handlePickedEndTime = date => {
    const selectedTime = moment(date).format("hh:mm A");
    setEndTime(selectedTime);

    setIsEndTimePickerVisible(false);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.startTimeView}>
            <Text style={styles.textHeader}>Start Time</Text>
            <Text
              style={styles.time}
              editable={false}
              onPress={() => setIsStartTimePickerVisible(true)}
            >
              {startTime}
            </Text>
            <CustomModalButton
              title="Save"
              onPress={() => handleCreateEventData()}
            />
          </View>
          <View style={styles.endTimeView}>
            <Text style={styles.textHeader}>End Time</Text>
            <Text
              style={styles.time}
              editable={false}
              onPress={() => setIsEndTimePickerVisible(true)}
            >
              {endTime}
            </Text>
            <CustomModalButton
              title="Delete"
              bgcolor="red"
              onPress={onDelete}
            />
          </View>
          <DateTimePicker
            isVisible={isStartTimePickerVisible}
            onConfirm={handlePickedStartTime}
            onCancel={() => {
              setIsStartTimePickerVisible(false);
            }}
            mode="time"
          />
          <DateTimePicker
            isVisible={isEndTimePickerVisible}
            onConfirm={handlePickedEndTime}
            onCancel={() => {
              setIsEndTimePickerVisible(false);
            }}
            mode="time"
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(100,100,100, 0.8)"
  },
  modalView: {
    flexDirection: "row",
    alignContent: "space-around",
    justifyContent: "flex-end",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 15
  },
  startTimeView: {
    padding: 20
  },
  textHeader: {
    color: colors.yellow,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  time: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
    marginBottom: 20
  },
  endTimeView: {
    padding: 20,
    justifyContent: "space-between"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

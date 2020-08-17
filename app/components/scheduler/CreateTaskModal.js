import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import uuid from "uuid";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";

import CustomModalButton from "./CustomModalButton";
import colors from "../../config/colors";
import { SchedulerContext } from "../../context/SchedulerContext";
import utils from "../../helpers/utils";

export default function CreateTaskModal({
  isModalVisible,
  onDelete,
  setIsModalVisible,
  selectedDate,
  updateCurrentTask
}) {
  const schedulerContext = useContext(SchedulerContext);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(
    false
  );
  const [startTime, setStartTime] = useState("00:00 AM");
  const [endTime, setEndTime] = useState("00:00 AM");
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const handleCreateEventData = async () => {
    //Validate the start time and end time and save the task
    if (!utils.validateStartTimeEndTime(selectedDate, startTime, endTime))
      return Alert.alert(
        "INCORRECT DATE/TIME SELECTED",
        "Start Date cannot be less than selected date or end date/time cannot be less than start date/time"
      );

    const title = `${utils.convertDateTimeToFormat(
      startTime,
      "MMMM Do, hh:mm A",
      "ddd hh:mm A"
    )} To ${utils.convertDateTimeToFormat(
      endTime,
      "MMMM Do, hh:mm A",
      "ddd hh:mm A"
    )}`;

    const notes = utils.calculateTotalDifferenceInTime(startTime, endTime);

    const creatTodo = {
      key: uuid(),
      date: selectedDate,
      todoList: [
        {
          key: uuid(),
          title,
          notes,
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

    await _addEventsToCalendar(title, notes, startTime, endTime);

    await schedulerContext.updateTodo(creatTodo);
    await updateCurrentTask(selectedDate);
    setIsModalVisible(false);
  };

  const _createNewCalendar = async () => {
    let calendarId = null;
    try {
      const newCalendar = {
        title: "Punch me reminder",
        entityType: Calendar.EntityTypes.EVENT,
        color: "#2196F3",
        source:
          Platform.OS === "ios"
            ? undefined
            : { isLocalAccount: true, name: "Expo Calendar" },
        name: "Punch Me",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
        ownerAccount: "personal"
      };

      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }

    return calendarId;
  };

  const _addEventsToCalendar = async (title, notes, startDate, endDate) => {
    const calendarId = await _createNewCalendar();
    const event = {
      title,
      notes,
      startDate: moment(startDate, "MMMM Do, hh:mm A").toDate(),
      endDate: moment(endDate, "MMMM Do, hh:mm A").toDate(),
      timeZone: Localization.timezone
    };

    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendarId ? calendarId.toString() : null,
        event
      );

      return createEventAsyncRes;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickedStartTime = date => {
    const selectedTime = moment(date).format("MMMM Do, hh:mm A");
    setStartTime(selectedTime);

    setIsStartTimePickerVisible(false);
  };

  const handlePickedEndTime = date => {
    const selectedTime = moment(date).format("MMMM Do, hh:mm A");
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
            headerTextIOS="Pick a time"
            date={moment(selectedDate).toDate()}
            isVisible={isStartTimePickerVisible}
            onConfirm={handlePickedStartTime}
            onCancel={() => {
              setIsStartTimePickerVisible(false);
            }}
            mode="datetime"
          />
          <DateTimePicker
            isVisible={isEndTimePickerVisible}
            date={moment(selectedDate).toDate()}
            onConfirm={handlePickedEndTime}
            onCancel={() => {
              setIsEndTimePickerVisible(false);
            }}
            mode="datetime"
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
    fontSize: 12,
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

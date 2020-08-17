import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import moment from "moment";
import * as Calendar from "expo-calendar";
import { useColorScheme } from "react-native-appearance";
import CalendarStrip from "react-native-calendar-strip";

import colors from "../config/colors";
import CreateTaskModal from "../components/scheduler/CreateTaskModal";
import ViewTaskComp from "../components/scheduler/ViewTaskComp";
import AppThemeContext from "../context/AppThemeContext";
import EmptyTaskComp from "../components/scheduler/EmptyTaskComp";

export default function ScheduleScreen({ route, navigation }) {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const [datesWhitelist, setDatesWhiteList] = useState([
    {
      start: moment(),
      end: moment().add(365, "days") // total 4 days enabled
    }
  ]);
  const [todoList, setTodoList] = useState([]);
  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${moment().format("YYYY")}-${moment().format("MM")}-${moment().format(
      "DD"
    )}`
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    _updateCurrentTask(currentDate);
    //_handleDeletePreviousDayTask();
  }, []);

  const _handleDeletePreviousDayTask = async () => {
    try {
      const value = await AsyncStorage.getItem("TODO");

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format("YYYY")}-${moment().format(
          "MM"
        )}-${moment().format("DD")}`;
        const checkDate = moment(todayDate);
        await todoList.filter(item => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, "days");
          if (checkedDate > 0) {
            item.todoList.forEach(async listValue => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        _updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem("TODO");
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          setTodoList(todoLists[0].todoList);
        } else {
          setTodoList([]);
        }
        setMarkedDate(markDot);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  const _getEvent = async () => {
    if (selectedTask && selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <CreateTaskModal
        isModalVisible={isModalVisible}
        onDelete={handleDelete}
        setIsModalVisible={setIsModalVisible}
        selectedDate={currentDate}
        updateCurrentTask={_updateCurrentTask}
      />
      <View
        style={{
          flex: 1,
          backgroundColor:
            themeColor === "dark" ? colors.black : colors.lightBackground
        }}
      >
        <CalendarStrip
          ref={ref => {
            calenderRef = ref;
          }}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          style={{
            height: 150,
            paddingTop: 20,
            marginTop: 20,
            backgroundColor: themeColor === "dark" ? "#1A1A1A" : colors.white
          }}
          calendarHeaderStyle={{
            color: themeColor === "dark" ? "#DFDFE4" : colors.black
          }}
          dateNumberStyle={{
            color: themeColor === "dark" ? colors.white : colors.black,
            paddingTop: 10
          }}
          dateNameStyle={{
            color: themeColor === "dark" ? "#BBBBBB" : colors.black
          }}
          highlightDateNumberStyle={styles.highlightedDatesNumber}
          highlightDateNameStyle={{
            color: themeColor === "dark" ? colors.white : colors.black
          }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey", paddingTop: 10 }}
          datesWhitelist={datesWhitelist}
          iconLeft={require("../assets/left-arrow.png")}
          iconRight={require("../assets/right-arrow.png")}
          iconContainer={{ flex: 0.1 }}
          markedDates={markedDate}
          selectedDate={new moment().toDate()}
          onDateSelected={date => {
            const selectedDate = `${moment(date).format("YYYY")}-${moment(
              date
            ).format("MM")}-${moment(date).format("DD")}`;
            _updateCurrentTask(selectedDate);
            setCurrentDate(selectedDate);
          }}
        />
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.viewTask}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
              color: themeColor === "dark" ? "black" : colors.lightBackground
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        {todoList.length > 0 ? (
          <View
            style={{
              width: "100%",
              height: Dimensions.get("window").height - 170
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 180
              }}
            >
              {todoList.map(item => (
                <ViewTaskComp
                  key={item.key}
                  item={item}
                  _getEvent={_getEvent}
                  setSelectedTask={setSelectedTask}
                  theme={themeColor}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <EmptyTaskComp theme={themeColor} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewTask: {
    flex: 1,
    position: "absolute",
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: colors.yellow,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  highlightedDatesNumber: {
    color: colors.white,
    backgroundColor: "#4B4BF9",
    marginTop: 10,
    height: 35,
    width: 35,
    textAlign: "center",
    borderRadius: 17.5,
    overflow: "hidden",
    paddingTop: 6,
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    height: 25,
    borderColor: "#5DD976",
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19
  }
});

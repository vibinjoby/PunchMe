import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import commons from "../config/commonConstants";
import { Alert } from "react-native";

const prefixZero = (number) => {
  //If the input passed is not a string then stringify the input
  number = typeof number !== "string" ? JSON.stringify(number) : number;
  //If the length of the input is less than 2 then the number is prefixed with zero
  return number.length < 2 ? `0${number}` : number;
};

const getCurrentTime = (format = "hh:mm A") => {
  return moment(new Date()).format(format);
};

const getCurrentDateTimeStamp = (format = "MMMM Do YYYY, h:mm:ss a") => {
  return moment(new Date()).format(format);
};

const storeAsyncStorageData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchAsyncStorageData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
    throw e;
  }
};

const removeAsyncStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const getDbInitialData = async () => {
  try {
    const value = await AsyncStorage.getItem(commons.IS_TABLE_CREATED);
    if (value !== null) return value;

    //If the data is not available store the data
    storeAsyncStorageData(commons.IS_TABLE_CREATED, commons.YES);
  } catch (e) {
    console.log(e);
  }
};
const registerAndSendPushNotifications = async (title, body) => {
  try {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (!permission.granted) return;

    // Fetch the storage token from Async storage for notifications
    const storageToken = fetchAsyncStorageData(commons.NOTIFICATION_TOKEN);
    storageToken.then(async (token) => {
      if (!token) {
        //If the token is not available get a new token and store it in Async storage
        token = await Notifications.getExpoPushTokenAsync();
        storeAsyncStorageData(commons.NOTIFICATION_TOKEN, token.data);
      }
      // Only if the notification is enabled in settings page send the notification
      fetchAsyncStorageData(commons.IS_NOTIFICATION_ENABLED).then((value) => {
        if (value.includes(commons.YES))
          sendPushNotification(token, title, body);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
function sendPushNotification(token, title, body) {
  const message = {
    to: token,
    sound: "default",
    title,
    body,
    data: { _displayInForeground: true },
  };

  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate",
      host: "exp.host",
    },
    body: JSON.stringify(message),
  });
}

const getFormattedDate = (date) => {
  console.log(date);
  let formattedDate = moment(date, "MMMM Do YYYY, h:mm:ss a").format(
    "DD/MM/yyyy"
  );
  formattedDate = moment(formattedDate, "DD/MM/yyyy").calendar();
  return formattedDate.split(" ")[0];
};

const getFormatedDateFromMillies = (date) => {
  return moment(date).format("dddd, MMMM DD, YYYY");
};

const getOnlyTime = (date) => {
  return moment(date).format("hh:mm a");
};

const getOnlyHours = (date) => {
  return moment(date).format("hh mm");
};

const getDateDifference = (start, end) => {
  let duration = moment.duration(moment(end).diff(start));
  return duration.asHours();
};

const calculateEarnings = (hourlyPay, totalHours, totalMinutes) => {
  let earnings = hourlyPay * totalHours;
  earnings += (totalMinutes / 60) * hourlyPay;
  //Round off to two decimal places
  return Math.floor(earnings * 100) / 100;
};

const storePunchInDetails = async (jobTitle, punchDetailsObj) => {
  await storeAsyncStorageData(jobTitle, punchDetailsObj);
};

const getBreakExcludedPunchTime = (punchDuration, punchObj) => {
  try {
    let breakDuration = getTotalBreakOnlyHours(punchObj);

    let actualWorkedHours = moment(
      `${punchDuration.hours}:${punchDuration.minutes}:${punchDuration.seconds}`,
      "HH:mm:ss"
    )
      .subtract(breakDuration)
      .format("HH:mm:ss");

    //console.log("actual worked hours" + actualWorkedHours);
    return actualWorkedHours;
  } catch (error) {
    console.log(error);
  }
};

const getTotalBreakOnlyHours = (punchObj) => {
  try {
    let currentTime = moment(new Date()).format("HH:mm:ss").toString();
    let number = moment.duration(
      moment(
        punchObj.breakPunchOut ? punchObj.breakPunchOut : currentTime,
        "HH:mm:ss"
      ).diff(moment(punchObj.breakPunchIn, "HH:mm:ss"))
    );

    let breakDuration = moment.duration(number)._data;

    // Check if there was a previous break entry duration and add it to the total break duration
    if (punchObj.breakDuration) {
      if (typeof punchObj.breakDuration === "string") {
        let hours, minutes, seconds;
        hours = prefixZero(punchObj.breakDuration.split(":")[0]);
        minutes = prefixZero(punchObj.breakDuration.split(":")[1]);
        seconds = prefixZero(punchObj.breakDuration.split(":")[2]);

        breakDuration = moment(`${hours}:${minutes}:${seconds}`, "HH:mm:ss")
          .add(breakDuration)
          .format("HH:mm:ss");
      } else {
        breakDuration = moment(
          `${prefixZero(punchObj.breakDuration.hours)}:${prefixZero(
            punchObj.breakDuration.minutes
          )}:${prefixZero(punchObj.breakDuration.seconds)}`,
          "HH:mm:ss"
        )
          .add(breakDuration)
          .format("HH:mm:ss");
      }
    }

    //Format the duration only if the value is an object else return as is
    return typeof breakDuration === "object"
      ? `${prefixZero(breakDuration.hours)}:${prefixZero(
          breakDuration.minutes
        )}:${prefixZero(breakDuration.seconds)}`
      : breakDuration;
  } catch (error) {
    console.log(error);
  }
};

const getDuration = (inTime) => {
  let currentTime = moment(new Date()).format("HH:mm:ss").toString();
  let number = moment.duration(
    moment(currentTime, "HH:mm:ss").diff(moment(inTime, "HH:mm:ss"))
  );
  return moment.duration(number)._data;
};

//This function calculates the total time difference between the start time and end time in create task
//Sample input --> startTime= "Sun 17, 12:30 AM" endTime= "Sun 17, 01:30 PM" result= "01:00"
const calculateTotalDifferenceInTime = (start, end) => {
  try {
    const startTime = moment(start, "MMMM Do, hh:mm A");
    const endTime = moment(end, "MMMM Do, hh:mm A");

    let diff = moment.duration(endTime.diff(startTime));

    let hours = diff.hours();
    let minutes = diff.minutes();
    return `${hours} ${parseInt(hours) > 1 ? "hours" : "hour"} ${minutes} ${
      parseInt(minutes) > 1 ? "minutes" : "minute"
    }`;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//If the end time is less than start time return false else true
const validateStartTimeEndTime = (selectedDate, startTime, endTime) => {
  try {
    // If the start date and the selected date is not same return false
    if (
      !moment(
        convertDateTimeToFormat(startTime, "MMMM Do, hh:mm A", "YYYY-MM-DD")
      ).isSame(moment(selectedDate, "YYYY-MM-DD"))
    )
      return false;

    return moment(startTime, "MMMM Do, hh:mm A").isBefore(
      moment(endTime, "MMMM Do, hh:mm A")
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

const showAlertPopupWithLoading = (setIsLoading, error) => {
  Alert.alert("Error!!", error, [
    {
      text: "OK",
      onPress: () => setIsLoading(false),
      style: "cancel",
    },
  ]);
};

const convertDateTimeToFormat = (dateTime, currentFormat, expectedFormat) => {
  return moment(moment(dateTime, currentFormat).toDate()).format(
    expectedFormat
  );
};

const getUserProfileName = (username) => {
  if (!username) return;
  const fName = username.split(" ")[0];
  const lName = username.split(" ")[1];

  return (
    fName.charAt(0).toUpperCase() +
    "" +
    (lName ? lName.charAt(0).toUpperCase() : "")
  );
};

export default {
  prefixZero,
  getCurrentTime,
  getCurrentDateTimeStamp,
  getDbInitialData,
  storeAsyncStorageData,
  removeAsyncStorageData,
  getFormattedDate,
  getFormatedDateFromMillies,
  getOnlyTime,
  getOnlyHours,
  getDateDifference,
  fetchAsyncStorageData,
  registerAndSendPushNotifications,
  calculateEarnings,
  storePunchInDetails,
  getBreakExcludedPunchTime,
  getTotalBreakOnlyHours,
  getDuration,
  calculateTotalDifferenceInTime,
  validateStartTimeEndTime,
  showAlertPopupWithLoading,
  convertDateTimeToFormat,
  getUserProfileName,
};

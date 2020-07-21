import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

const prefixZero = (number) => {
  return parseInt(number) < 10 ? `0${number}` : number;
};

const getCurrentTime = () => {
  return moment(new Date()).format("hh:mm A");
};

const storeAsyncStorageData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const fetchAsyncStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(e);
  }
};

const removeAsyncStorageData = async (key) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(e);
  }
};

const getDbInitialData = async () => {
  try {
    const value = await AsyncStorage.getItem("is_tables_created");
    if (value !== null) return value;

    //If the data is not available store the data
    storeAsyncStorageData("is_tables_created", "Y");
  } catch (e) {
    console.log(e);
  }
};
const registerAndSendPushNotifications = async (title, body) => {
  try {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (!permission.granted) return;

    // Fetch the storage token from Async storage for notifications
    const storageToken = fetchAsyncStorageData("notification_token");
    storageToken.then(async (token) => {
      if (!token) {
        //If the token is not available get a new token and store it in Async storage
        token = await Notifications.getExpoPushTokenAsync();
        storeAsyncStorageData("notification_token", token.data);
      }
      sendPushNotification(token, title, body);
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

const calculateEarnings = (hourlyPay, totalHours, totalMinutes) => {
  let earnings = hourlyPay * totalHours;
  earnings += (totalMinutes / 60) * hourlyPay;
  //Round off to two decimal places
  return Math.floor(earnings * 100) / 100;
};

calculateEarnings(15, 1, 1);

export default {
  prefixZero,
  getCurrentTime,
  getDbInitialData,
  storeAsyncStorageData,
  removeAsyncStorageData,
  getFormattedDate,
  fetchAsyncStorageData,
  registerAndSendPushNotifications,
  calculateEarnings,
};

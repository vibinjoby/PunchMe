import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

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

const getFormattedDate = (date) => {
  console.log(date);
  let formattedDate = moment(date, "MMMM Do YYYY, h:mm:ss a").format(
    "DD/MM/yyyy"
  );
  formattedDate = moment(formattedDate, "DD/MM/yyyy").calendar();
  return formattedDate.split(" ")[0];
};

export default {
  prefixZero,
  getCurrentTime,
  getDbInitialData,
  storeAsyncStorageData,
  getFormattedDate,
};

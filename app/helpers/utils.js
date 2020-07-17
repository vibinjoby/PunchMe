import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

const prefixZero = number => {
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

export default {
  prefixZero,
  getCurrentTime,
  getDbInitialData,
  storeAsyncStorageData
};

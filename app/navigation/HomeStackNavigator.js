import React, { useContext } from "react";
import { Button, Alert, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobNavigator from "./JobNavigator";
import AddJobScreen from "../screens/AddJobScreen";
import { HeaderBackButton } from "@react-navigation/stack";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";
import db from "../helpers/db";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CardStyleInterpolators } from "@react-navigation/stack";
import AppThemeContext from "../context/AppThemeContext";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const handleAddJob = (route, navigation) => {
    //Get the params from Add Job Screen when the save is clicked
    const { title, hourlyPay, notes, handleErrors } = route.params;

    //If the title or hourly pay is empty add errors to the text input
    if (!title || !hourlyPay) {
      handleErrors(!title ? "title" : null, !hourlyPay ? "hourlyPay" : null);
      return;
    }

    //Save the job to DB if the inputs are non empty
    db.addJobs(title.trim(), hourlyPay, notes)
      .then(() => {
        Alert.alert(
          "New Job Added!!!",
          "You have successfully added a new Job",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("JobNavigator", {
                  jobName: "dummy" // Added params for the target screen to re-render the screen
                })
            }
          ]
        );
      })
      .catch(err => alert(`something went wrong in the DB ${err}`));
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobNavigator"
        component={JobNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddJob"
        component={AddJobScreen}
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.white : colors.black
          },
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: themeColor === "dark" ? colors.white : colors.black
          },
          headerBackTitleStyle: { color: colors.yellow },
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              label="Cancel"
              tintColor={colors.yellow}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                handleAddJob(route, navigation);
              }}
            >
              <Text
                style={{
                  color: colors.yellow,
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingRight: 5
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
}

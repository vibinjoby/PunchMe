import React from "react";
import { Button, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobNavigator from "./JobNavigator";
import AddJobScreen from "../screens/AddJobScreen";
import { HeaderBackButton } from "@react-navigation/stack";
import colors from "../config/colors";
import db from "../helpers/db";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  const handleAddJob = (route, navigation) => {
    //Get the params from Add Job Screen when the save is clicked
    const { title, hourlyPay, notes, handleErrors } = route.params;

    //If the title or hourly pay is empty add errors to the text input
    if (!title || !hourlyPay) {
      handleErrors(!title ? "title" : null, !hourlyPay ? "hourlyPay" : null);
      return;
    }

    //Save the job to DB if the inputs are non empty
    db.addJobs(title, hourlyPay, notes)
      .then(data => {
        Alert.alert(
          "New Job Added!!!",
          "You have successfully added a new Job",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("JobNavigator", {
                  jobName: "Loblaws"
                })
            }
          ]
        );
        console.log(data);
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
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Cancel",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
          headerRight: () => (
            <Button
              onPress={() => {
                handleAddJob(route, navigation);
              }}
              title="Save"
              color={colors.yellow}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

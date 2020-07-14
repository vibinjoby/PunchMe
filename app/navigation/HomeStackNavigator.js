import React from "react";
import { Button, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import JobNavigator from "./JobNavigator";
import AddJobScreen from "../screens/AddJobScreen";
import { HeaderBackButton } from "@react-navigation/stack";
import colors from "../config/colors";

const Stack = createStackNavigator();

export default function HomeStackNavigator({ navigation }) {
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
        options={{
          headerBackTitleStyle: { color: colors.yellow },
          headerBackImage: null,
          headerBackTitle: "Cancel",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
          headerRight: () => (
            <Button
              onPress={() => {
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
              }}
              title="Save"
              color={colors.yellow}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

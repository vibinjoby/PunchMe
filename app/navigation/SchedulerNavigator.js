import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
import ScheduleScreen from "../screens/ScheduleScreen";

const Stack = createStackNavigator();

export default function SchedulerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.SCHEDULER}
        component={ScheduleScreen}
        options={{
          headerShown: true,
          headerLeft: null,
          headerTitleAlign: "center"
        }}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobNavigator from "./JobNavigator";
import AddJobScreen from "../app/screens/AddJobScreen";

const Stack = createStackNavigator();

export default function HomeStackNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="JobNavigator" component={JobNavigator} />
      <Stack.Screen name="AddJob" component={AddJobScreen} />
    </Stack.Navigator>
  );
}

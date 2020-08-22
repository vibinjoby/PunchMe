import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginStackNavigator from "./LoginStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

const Stack = createStackNavigator();

export default function ParentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStackNavigator"
        component={LoginStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

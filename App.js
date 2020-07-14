import React from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

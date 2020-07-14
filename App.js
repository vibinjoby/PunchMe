import React from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

import React, { useState } from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import OnboardingComponent from "./app/components/onboarding/OnboardingComponent";

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);

  return showRealApp ? (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  ) : (
    <OnboardingComponent
      handleStart={() => {
        setShowRealApp(true);
      }}
    />
  );
}

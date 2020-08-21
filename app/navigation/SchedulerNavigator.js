import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native-appearance";

import routes from "./routes";
import ScheduleScreen from "../screens/ScheduleScreen";
import AppThemeContext from "../context/AppThemeContext";
import colors from "../config/colors";

const Stack = createStackNavigator();

export default function SchedulerNavigator() {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.SCHEDULER}
        component={ScheduleScreen}
        options={{
          headerShown: true,
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          }
        }}
      />
    </Stack.Navigator>
  );
}

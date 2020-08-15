import React, { useContext } from "react";
import { useColorScheme } from "react-native-appearance";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";
import SchedulerNavigator from "./SchedulerNavigator";
import AppThemeContext from "../context/AppThemeContext";

const Tab = createBottomTabNavigator();

export default AppNavigator = () => {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor:
            themeColor === "dark" ? colors.black : colors.lightPrimary
        },
        activeTintColor: colors.yellow,
        inactiveTintColor: themeColor === "dark" ? "#eee" : colors.white
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name={routes.SCHEDULE}
        component={SchedulerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name={routes.SETTINGS}
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

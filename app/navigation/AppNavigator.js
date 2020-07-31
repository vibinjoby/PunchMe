import React from "react";
import { useColorScheme } from "react-native-appearance";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import ActivityScreen from "../screens/ActivityScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

export default AppNavigator = () => {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.yellow,
        inactiveTintColor: "#eee"
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
        component={ActivityScreen}
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

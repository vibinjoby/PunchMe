import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import routes from "./routes";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

export default AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: "#eee",
    }}
  >
    <Tab.Screen
      name={routes.HOME}
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={routes.LOGS}
      component={ActivityScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={routes.SETTINGS}
      component={SettingsStackNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="settings" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
import TermsandconditionsScreen from "../screens/TermsandconditionsScreen";
import colors from "../config/colors";
import { HeaderBackButton } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsandconditionsScreen}
        options={({ navigation }) => ({
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Cancel",
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

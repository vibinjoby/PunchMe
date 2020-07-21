import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
import Termsandsconditions from "../screens/TermsandconditionsScreen";
import colors from "../config/colors";

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
        component={Termsandsconditions}
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

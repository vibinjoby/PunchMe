import React from "react";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import SettingsScreen from "../screens/SettingsScreen";
import TermsConditionsScreen from "../screens/TermsConditionsScreen";
import colors from "../config/colors";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerLeft: null,
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsConditionsScreen}
        options={({ navigation }) => ({
          title: "Terms and conditions",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Cancel",
          headerTitleAlign: "center",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
    </Stack.Navigator>
  );
}

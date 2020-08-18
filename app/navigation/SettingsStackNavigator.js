import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Button, Alert, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SettingsScreen from "../screens/SettingsScreen";
import TermsConditionsScreen from "../screens/TermsConditionsScreen";
import ContactusScreen from "../screens/ContactusScreen";
import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import ReportScreen from "../screens/ReportScreen";

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
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Contactus"
        component={ContactusScreen}
        options={({ navigation }) => ({
          title: "Contact Us",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
        })}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsConditionsScreen}
        options={({ navigation }) => ({
          title: "Terms and conditions",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
        })}
      />
      <Stack.Screen
        name="Myaccount"
        component={AccountScreen}
        options={({ navigation }) => ({
          title: "My Account",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                handleAddJob(route, navigation);
              }}
            >
              <Text
                style={{
                  color: colors.yellow,
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingRight: 5,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={({ navigation }) => ({
          title: "Report a problem",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

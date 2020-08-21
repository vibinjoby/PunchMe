import React, { useContext } from "react";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useColorScheme } from "react-native-appearance";

import SettingsScreen from "../screens/SettingsScreen";
import TermsConditionsScreen from "../screens/TermsConditionsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import AccountScreen from "../screens/AccountScreen";
import colors from "../config/colors";
import ReportScreen from "../screens/ReportScreen";
import ThemeScreen from "../screens/ThemeScreen";
import routes from "./routes";
import LoginStackNavigator from "./LoginStackNavigator";
import AppThemeContext from "../context/AppThemeContext";

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.SETTINGS}
        component={SettingsScreen}
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
      <Stack.Screen
        name={routes.CONTACT_US}
        component={ContactUsScreen}
        options={({ navigation }) => ({
          title: "Contact Us",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          },
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.TERMS_CONDITIONS}
        component={TermsConditionsScreen}
        options={({ navigation }) => ({
          title: "Terms and conditions",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          },
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.MY_ACCOUNT}
        component={AccountScreen}
        options={({ navigation }) => ({
          title: "My Account",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          },
          headerLeft: props => (
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
                  paddingRight: 5
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name={routes.REPORT}
        component={ReportScreen}
        options={({ navigation }) => ({
          title: "Report a problem",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          },
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.THEME}
        component={ThemeScreen}
        options={({ navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            color: colors.white
          },
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name="LoginStackNavigator"
        component={LoginStackNavigator}
        options={{ headerShown: false, title: "" }}
      />
    </Stack.Navigator>
  );
}

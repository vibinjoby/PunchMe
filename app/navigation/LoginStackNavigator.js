import React, { useContext } from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  CardStyleInterpolators
} from "@react-navigation/stack";
import { useColorScheme } from "react-native-appearance";

import LoginScreen from "../screens/LoginScreen";
import routes from "./routes";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPwdScreen from "../screens/ForgotPwdScreen";
import colors from "../config/colors";
import AppNavigator from "./AppNavigator";
import TempPwdScreen from "../screens/TempPwdScreen";
import ChangePwdScreen from "../screens/ChangePwdScreen";
import AppThemeContext from "../context/AppThemeContext";

const Stack = createStackNavigator();

export default function LoginStackNavigator() {
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;
  return (
    <Stack.Navigator
      navigationOptions={{ headerLayoutPreset: "center" }}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

        headerStyle: {
          backgroundColor:
            themeColor === "light" ? colors.lightPrimary : colors.black
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "ProximaNovaBold",
          color: colors.white
        }
      }}
    >
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={({ route, navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: "Register",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "ProximaNovaBold",
            color: colors.white
          },
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.FORGOT_PWD}
        component={ForgotPwdScreen}
        options={({ route, navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: "Forgot Password",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleStyle: {
            fontFamily: "ProximaNovaBold",
            color: colors.white
          },
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.TEMP_PWD}
        component={TempPwdScreen}
        options={({ route, navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: "Temporary Password",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "ProximaNovaBold",
            color: colors.white
          },
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name={routes.CHANGE_PWD}
        component={ChangePwdScreen}
        options={({ route, navigation }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: "Change Password",
          headerStyle: {
            backgroundColor:
              themeColor === "light" ? colors.lightPrimary : colors.black
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "ProximaNovaBold",
            color: colors.white
          },
          headerBackTitleStyle: { color: colors.yellow },
          headerBackTitle: "Back",
          headerLeft: props => (
            <HeaderBackButton {...props} tintColor={colors.yellow} />
          )
        })}
      />
      <Stack.Screen
        name="Home"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

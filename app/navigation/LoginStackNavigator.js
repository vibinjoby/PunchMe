import React from "react";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import routes from "./routes";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPwdScreen from "../screens/ForgotPwdScreen";
import colors from "../config/colors";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={({ route, navigation }) => ({
          title: "",
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
          title: "",
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

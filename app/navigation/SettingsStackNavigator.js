import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";
<<<<<<< HEAD
import TermsandconditionsScreen from "../screens/TermsandconditionsScreen";
import colors from "../config/colors";
import { HeaderBackButton } from "@react-navigation/stack";
=======
import Termsandsconditions from "../screens/TAndCScreen";
import colors from "../config/colors";
>>>>>>> a6a167554814383f906b6644ba0c8f4920973242

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
<<<<<<< HEAD
        component={TermsandconditionsScreen}
=======
        component={Termsandsconditions}
>>>>>>> a6a167554814383f906b6644ba0c8f4920973242
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

import React, { useState, useEffect } from "react";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import * as Sentry from "sentry-expo";

import OnboardingComponent from "./app/components/onboarding/OnboardingComponent";
import utils from "./app/helpers/utils";
import db from "./app/helpers/db";
import commons from "./app/config/commonConstants";
import LoginStackNavigator from "./app/navigation/LoginStackNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  // Initializing sentry for logging
  Sentry.init({
    dsn:
      "https://9ef9497ed088461989e27795c6427065@o388140.ingest.sentry.io/5383811",
    enableInExpoDevelopment: true,
    debug: true
  });
  const [showRealApp, setShowRealApp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const key = commons.FIRST_TIME_APP_LOAD;
    //Check async storage to see if onboarding screen is to be shown or not
    utils.fetchAsyncStorageData(key).then(value => {
      if (value) setShowRealApp(true);
      //Else store the async key with value so that the onboarding screen is not shown again
      else {
        utils.storeAsyncStorageData(key, commons.YES);
        //Initialize Tables in the DB for first time app load
        db.init();
      }
    });

    utils.fetchAsyncStorageData(commons.TOKEN_KEY).then(value => {
      if (value) setLoggedIn(true);
    });

    //Disabling the warnings
    console.disableYellowBox = true;

    //Toggle this comment to reset all data and do only in development mode
    //utils.removeAsyncStorageData(tokenKey);
    /*db.deleteAllData()
      .then(data => console.log(data))
      .catch(err => console.log(err));*/
  }, []);

  return (
    <AppearanceProvider>
      {showRealApp ? (
        <NavigationContainer theme={DarkTheme}>
          {!loggedIn ? <LoginStackNavigator /> : <AppNavigator />}
        </NavigationContainer>
      ) : (
        <OnboardingComponent
          handleStart={() => {
            setShowRealApp(true);
          }}
        />
      )}
    </AppearanceProvider>
  );
}

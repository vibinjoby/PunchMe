import React, { useState, useEffect } from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import OnboardingComponent from "./app/components/onboarding/OnboardingComponent";
import utils from "./app/helpers/utils";
import db from "./app/helpers/db";
import commons from "./app/config/commonConstants";

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);

  useEffect(() => {
    const key = commons.FIRST_TIME_APP_LOAD;
    //Check async storage to see if onboarding screen is to be shown or not
    utils.fetchAsyncStorageData(key).then(value => {
      if (value) setShowRealApp(true);
      //Else store the async key with value so that the onboarding screen is not shown again
      else {
        utils.storeAsyncStorageData(key, "Y");
        //Initialize Tables in the DB for first time app load
        db.init();
      }
    });

    //Toggle this comment to reset all data and do only in development mode
    /*db.deleteAllData()
      .then(data => console.log(data))
      .catch(err => console.log(err));*/
  }, []);

  return showRealApp ? (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  ) : (
    <OnboardingComponent
      handleStart={() => {
        setShowRealApp(true);
      }}
    />
  );
}

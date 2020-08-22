import React, { useState, useEffect } from "react";

import AppThemeContext from "../AppThemeContext";
import utils from "../../helpers/utils";

export default function AppThemeStore({ children }) {
  const [theme, setTheme] = useState("systemTheme");

  useEffect(() => {
    (async function() {
      //when loading first time if no theme preference then  default to system theme
      let preference = await utils.fetchAsyncStorageData("theme");
      //Remove the unwanted characters in the theme stored value from async storage
      if (preference)
        updateTheme(preference.replace(/['"]+/g, "").replace(/\\"/g, ""));
      else updateTheme("systemTheme");
    })();
  }, []);

  const updateTheme = value => {
    setTheme(value);
    //Update the theme in the local storage
    utils.storeAsyncStorageData("theme", value);
  };

  return (
    <AppThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </AppThemeContext.Provider>
  );
}

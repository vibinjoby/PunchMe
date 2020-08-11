import React, { useState, useEffect } from "react";

import AppThemeContext from "../AppThemeContext";
import { useColorScheme } from "react-native-appearance";

export default function AppThemeStore({ children }) {
  const [theme, setTheme] = useState("dark");
  const systemTheme = useColorScheme();

  const updateTheme = value => {
    setTheme(value);
  };
  return (
    <AppThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </AppThemeContext.Provider>
  );
}

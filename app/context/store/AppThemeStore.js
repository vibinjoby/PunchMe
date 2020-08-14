import React, { useState } from "react";

import AppThemeContext from "../AppThemeContext";

export default function AppThemeStore({ children }) {
  const [theme, setTheme] = useState("systemTheme");

  const updateTheme = value => {
    if (value === "systemTheme") setTheme(systemTheme);
    else if (value === "light") setTheme("light");
    else if (value === "dark") setTheme("dark");
  };
  return (
    <AppThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </AppThemeContext.Provider>
  );
}

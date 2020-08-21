import React, { useState } from "react";

import UserContext from "../UserContext";

export default function UserInfoStore({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userInfo, setIsLoggedIn, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
}

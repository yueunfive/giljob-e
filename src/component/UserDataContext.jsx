import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    residence: "",
    education: "",
    jobStatus: "",
    age: null,
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

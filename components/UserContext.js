import { createContext, useContext, useEffect, useState } from "react";
import { storageKey } from "./constants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userStudID: null,
    accessToken: null,
    refreshToken: null
  });

  useEffect(() => {
    // Load user data from storage when the component mounts
    const storedUserData = localStorage.getItem(storageKey);
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    // Save updated user data to storage
    localStorage.setItem(storageKey, JSON.stringify(newUserData));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData: updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

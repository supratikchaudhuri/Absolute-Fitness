import React , {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({});

  const cacheUser = (userDetails) => {
    setUser(userDetails);
    console.log(userDetails);
    console.log(user);
  }

  const uncacheUser = () => {
    setUser({});
  }

  return (
      <UserContext.Provider value = {{ user, cacheUser, uncacheUser }}>
          {props.children}
      </UserContext.Provider>
  )
} 
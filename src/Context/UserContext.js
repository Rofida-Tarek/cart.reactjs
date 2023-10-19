import { createContext, useState } from "react";

export let userContext = createContext();
export default function UserContextProvider(props) {
  let [usertoken, setusertoken] = useState(null);
  let [username, setusername] = useState(localStorage.getItem("userName"));
  return (
    <userContext.Provider
      value={{ usertoken, setusertoken, username, setusername }}
    >
      {props.children}
    </userContext.Provider>
  );
}

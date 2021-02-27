import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(null);
  const [credits, setCredits] = useState(0);

  const fetchUser = async () => {
    const result = await axios.get("/api/current-user");
    if (result.data === null) {
      setIsAuth(null);
    } else if (result.data === "") {
      setIsAuth(false);
      console.log("User is logged out");
    } else if (result.data !== "") {
      setIsAuth(true);
      console.log("User is logged in");
    }
    setCredits(result.data.credits); //setting credits info from updated user
    // user is updated by getting that credit value from Stripe called
    // in Payments.js
    // Credits is part of User model defined in Mongoose
  };

  return (
    <AuthContext.Provider value={{ isAuth, fetchUser, credits }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

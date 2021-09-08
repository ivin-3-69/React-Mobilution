/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Login from "./modules/Login/Login";
import Home from "modules/home/Home2";
import MenuAppBar from "modules/Login/navbar";
import AuthContext from "store/auth-context";

const useStyles = makeStyles(styles);


function App() {
  const [resp, setResp] = useState();
  const [LoggedIn, setIsLoggedIn] = useState(false);
  const [intstate, Setintstate] = useState("");

  const loginHandler = async (email, password) => {
    const state = {
      email: email,
      password: password,
    };
    axios
      .post("/auth/signin", state)
      .then((response) => {
        //console.log("Success ========>", response.status);
        if (response.status === 200) {
          setResp((prev) => response.data.payload);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "1");
          localStorage.setItem(
            "userDeatail",
            JSON.stringify(response.data.payload)
          );
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userDeatail");
        }
      })
      .catch((error) => {
        console.log("Error ========>", error);
        Setintstate("error");
      });
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDeatail");
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "1") {
      setIsLoggedIn(true);
      setResp(JSON.parse(localStorage.getItem("userDeatail")));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        LoggedIn: LoggedIn,
        logout: logoutHandler,
      }}
    >
      <div>
        {LoggedIn && <Home response={resp}></Home>}
        {!LoggedIn && (
          <>
            <MenuAppBar></MenuAppBar>
            <Login
              text="success!"
              onLogin={loginHandler}
              intt={intstate}
            ></Login>
          </>
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;

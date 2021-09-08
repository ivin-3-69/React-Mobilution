/*eslint-disable*/
import React, { useState, useEffect } from "react";
import ForgForm from "./ForgForm";
import Form from "./Form2";
import axios from "axios";
import ForgFormAct from "./ForgFormAct";
import AuthNavbar from "components/Navbars/AuthNavbar";
import AdminNavbar from "components/Navbars/AdminNavbar";

function Login(props) {
  const [forgpass, Setforgpass] = useState(false);

  const loginHandler = (emai, pass) => {
    props.onLogin(emai, pass);
  };

  const forgpasshandler = () => {
    Setforgpass(true);
  };

  const ForgloginHandler = async (email) => {
    const state = {
      email: email,
    };
    console.log(state);
    axios
      .post("/auth/forgot/password", state)
      .then((response) => {
        console.log("Success ========>", response.status);
        if (response.status === 200) {
          Setforgpass("activate");
        }
      })
      .catch((error) => {
        console.log("Error ========>", error);
      });
    Setforgpass("activate");
  };

  const ForgActHandler = async (email, password, OTP) => {
    const state = {
      email: email,
      password: password,
      otp: OTP,
    };
    console.log(state);
    axios
      .post("/auth/update/password", state)
      .then((response) => {
        console.log("Success ========>", response.status);
        if (response.status === 200) {
          Setforgpass(false);
        }
      })
      .catch((error) => {
        console.log("Error ========>", error);
      });
  };

  return (
    <>
      {forgpass === false && (
        <Form
          onLogin={loginHandler}
          intstate={props.intt}
          forgpass={forgpasshandler}
        ></Form>
      )}
      {forgpass === true && <ForgForm onLogin={ForgloginHandler}></ForgForm>}
      {forgpass === "activate" && (
        <ForgFormAct onLogin={ForgActHandler}></ForgFormAct>
      )}
    </>
  );
}

export default Login;

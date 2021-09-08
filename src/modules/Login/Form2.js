/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Danger from "components/Typography/Danger.js";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

function Form(props) {
  const [loginEmail, setloginEmail] = React.useState("");
  const [loginEmailState, setloginEmailState] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [intitalstate, setInitialState] = React.useState("");

  useEffect(() => {
    setInitialState(props.intstate);
    if (props.intstate === "error") {
      setloginPassword("");
    }
  }, [props.intstate, intitalstate]);

  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const loginClick = () => {
    // console.log(intitalstate);
    if (loginEmailState === "") {
      setloginEmailState("error");
    }
    if (loginEmailState === "success") {
      props.onLogin(loginEmail, loginPassword);
    }
    setInitialState(null);
  };
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={9}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Contacts />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Login Form</h4>
          </CardHeader>
          <CardBody>
            <form>
              <CustomInput
                success={loginEmailState === "success"}
                error={loginEmailState === "error"}
                labelText="Email Address *"
                id="loginemail"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => {
                    if (verifyEmail(event.target.value)) {
                      setloginEmailState("success");
                    } else {
                      setloginEmailState("error");
                    }
                    setloginEmail(event.target.value);
                  },
                  type: "email",
                }}
              />
              <CustomInput
                error={intitalstate === "error"}
                labelText="Password *"
                id="loginpassword"
                type="reset"
                defaultValue="Reset"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => {
                    setloginPassword(event.target.value);
                  },
                  type: "password",
                  autoComplete: "off",
                  value: loginPassword,
                }}
              />
              <div className={classes.formCategory}>
                {intitalstate ? (
                  <Danger>Incorrect login details</Danger>
                ) : (
                  <p>
                    <small>*</small> Required fields
                  </p>
                )}
              </div>
              <div>
                <Button color="rose" onClick={loginClick}>
                  Login
                </Button>
                <Button color="warning" onClick={props.forgpass}>
                  Forgot password
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default Form;

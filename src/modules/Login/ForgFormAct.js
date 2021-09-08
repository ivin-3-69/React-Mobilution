/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

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

function ForgFormAct(props) {
  const [otp, setotp] = React.useState("");
  const [loginEmail, setloginEmail] = React.useState("");
  const [loginEmailState, setloginEmailState] = React.useState("");
  const [loginPassword, setloginPassword] = React.useState("");
  const [loginPasswordState, setloginPasswordState] = React.useState("");

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
    if (loginEmailState === "") {
      setloginEmailState("error");
    }
    if (loginPasswordState === "") {
      setloginPasswordState("error");
    }
    if (loginEmailState === "success" && loginPasswordState === "success") {
      props.onLogin(loginEmail, loginPassword, otp);
    }
  };
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
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
                success={loginPasswordState === "success"}
                error={loginPasswordState === "error"}
                labelText="Password *"
                id="loginpassword"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => {
                    if (verifyLength(event.target.value, 6)) {
                      setloginPasswordState("success");
                    } else {
                      setloginPasswordState("error");
                    }
                    setloginPassword(event.target.value);
                  },
                  type: "password",
                  autoComplete: "off",
                }}
              />
              <CustomInput
                labelText="OTP *"
                id="otp"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  onChange: (event) => {
                    setotp(event.target.value);
                  },
                  type: "text",
                }}
              />
              <div className={classes.formCategory}>
                <small>*</small> Required fields
              </div>
              <div>
                <Button color="rose" onClick={loginClick}>
                  Submit
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default ForgFormAct;

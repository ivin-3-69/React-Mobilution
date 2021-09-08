/*eslint-disable*/

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  // console.log(props.token);

  const submitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/consultant/save",
      data: {
        firstName: event.target[0].value,

        lastName: event.target[1].value,

        employeeId: event.target[2].value,

        mobile: event.target[4].value,

        email: event.target[3].value,
      },
      headers: {
        Authorization: `Bearer ${props.token.token}`,
      },
    }).then((response) => {
      props.hello();
    });
    props.love();
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
              <CustomInput
                labelText="First Name"
                id="firstname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                }}
              />
              <CustomInput
                labelText="Last Name"
                id="lastname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                }}
              />
              <CustomInput
                labelText="Employee Id"
                id="employeeId"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                }}
              />
              <CustomInput
                labelText="Email Id"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                }}
              />
              <CustomInput
                labelText="Contact No"
                id="contacts"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: "",
                }}
              />
              <Button type="submit" color="rose">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

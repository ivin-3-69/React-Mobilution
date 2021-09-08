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
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[4].value);
    axios({
      method: "post",
      url: "/consultant/save",
      data: {
        id: props.prop[0],

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
                  defaultValue: `${props.prop[1]}`,
                  type: "text",
                }}
              />
              <CustomInput
                labelText="Last Name"
                id="lastname"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: `${props.prop[2]}`,
                  type: "text",
                }}
              />
              <CustomInput
                labelText="Employee Id"
                id="empid"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: `${props.prop[3]}`,
                  type: "text",
                }}
              />
              <CustomInput
                labelText="Email Id"
                id="mail"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: `${props.prop[5]}`,
                  type: "text",
                }}
              />
              <CustomInput
                labelText="Contact No"
                id="phone"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  defaultValue: `${props.prop[4]}`,
                  type: "text",
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

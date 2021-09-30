/*eslint-disable*/

import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Datetime from "react-datetime";

import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  const classes = useStyles();
  const submitHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value && event.target[1].value) {
      const holiday = new Date(event.target[0].value);
      const holidate = `${holiday.getFullYear()}-${
        holiday.getMonth() + 1
      }-${holiday.getDate()}`;

      axios({
        method: "post",
        url: "/holiday/save",
        data: {
          id: props.prop[0],
          clientLocationId: props.id,
          date: holidate,
          description: event.target[1].value,
          holidaysEntered: props.prop[5],
          year: props.prop[6],
        },
        headers: {
          Authorization: `Bearer ${props.token.token}`,
        },
      }).then((response) => {
        props.hello();
      });

      props.love();
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
              <InputLabel className={classes.label}>Holiday Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: " Pick Date" }}
                  initialValue={new Date(`${props.prop[2]}`)}
                />
              </FormControl>

              <CustomInput
                labelText="Holiday Description"
                id="HolidayDesc"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: `${props.prop[4]}`,
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

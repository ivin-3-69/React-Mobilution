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
  const [startdatee, setstartdate] = useState(new Date(`${props.prop[2]}`));

  const submitHandler = (event) => {
    event.preventDefault();
    if (startdatee && event.target[1].value) {
      var holiday = `${startdatee.getFullYear()}-${
        startdatee.getMonth() + 1
      }-${startdatee.getDate()}`;

      axios({
        method: "post",
        url: "/holiday/save",
        data: {
          id: props.prop[0],
          clientLocationId: props.id,
          date: holiday,
          description: event.target[1].value,
          holidaysEntered: props.prop[5],
          year: startdatee.getFullYear(),
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
                  dateFormat="DD/MM/YYYY"
                  inputProps={{ placeholder: " Pick Date" }}
                  value={startdatee}
                  onChange={(event) => {
                    if (event._d) {
                      if (event._d.getHours() === 0) {
                        event._d.setHours(5, 30, 0);
                      }
                      setstartdate((prev) => event._d);
                    }
                  }}
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

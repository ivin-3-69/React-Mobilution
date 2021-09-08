/*eslint-disable*/

import React, { useState, useEffect } from "react";
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
  const [daysflag, setdaysflag] = useState(null);
  const [startdatee, setstartdate] = useState(new Date(`${props.prop[6]}`));
  const [enddatee, setenddate] = useState(new Date(`${props.prop[7]}`));

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (!(dayOfWeek == 0 || dayOfWeek == 6)) {
        count++;
        // console.log(dayOfWeek);
      }

      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const startdate = new Date(event.target[0].value);

    if (startdate.getDate() < 10) {
      var newdate = `0${startdate.getDate()}`;
    } else {
      newdate = startdate.getDate();
    }

    if (startdate.getMonth() + 1 < 10) {
      var newmonth = `0${startdate.getMonth() + 1}`;
    } else {
      newmonth = startdate.getMonth() + 1;
    }

    const enddate = new Date(event.target[1].value);

    if (enddate.getDate() < 10) {
      var newdate2 = `0${enddate.getDate()}`;
    } else {
      newdate2 = enddate.getDate();
    }

    if (enddate.getMonth() + 1 < 10) {
      var newmonth2 = `0${enddate.getMonth() + 1}`;
    } else {
      newmonth2 = enddate.getMonth() + 1;
    }

    const totaldayss = getDifferenceInDays(startdate, enddate) + 1;
    const businessdays = getBusinessDatesCount(startdate, enddate);
    const weekendss = totaldayss - businessdays;
    const workingdayss = Number(event.target[2].value);
    const holidays = Number(event.target[3].value);

    // console.log(workingdayss, holidays);
    // console.log(totaldayss, weekendss);
    if (workingdayss + holidays + weekendss === totaldayss) {
      axios({
        method: "post",
        url: "/billablemonth/save",
        data: [
          {
            id: props.prop[0],

            clientLocationId: props.prop[2],

            startDate: `${startdate.getFullYear()}-${newmonth}-${newdate}`,

            endDate: `${enddate.getFullYear()}-${newmonth2}-${newdate2}`,

            totalDays: totaldayss,

            weekends: weekendss,

            holidays: holidays,

            workingDays: workingdayss,

            year: props.billyear,

            monthName: props.BillMonth,

            month: props.BillMonthNumber,

            valid: true,
          },
        ],
        headers: {
          Authorization: `Bearer ${props.token.token}`,
        },
      }).then((response) => {
        props.hello();
      });
      props.love();
      setdaysflag(false);
    } else {
      setdaysflag(true);
      console.log("days input error");
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
              <InputLabel className={classes.label}>Start Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Date Picker Here" }}
                  initialValue={new Date(`${props.prop[6]}`)}
                  onChange={(event) => {
                    setstartdate((prev) => event._d);
                    // calculateDays();
                  }}
                />
              </FormControl>
              {/* {console.log(props.BillMonthNumber)} */}
              <InputLabel className={classes.label}>End Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Date Picker Here" }}
                  initialValue={new Date(`${props.prop[7]}`)}
                  onChange={(event) => {
                    setenddate((prev) => event._d);
                    // calculateDays();
                  }}
                />
              </FormControl>

              <CustomInput
                labelText="Working Daya"
                id="WorkDays"
                error={daysflag}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  defaultValue: props.prop[9],
                }}
              />

              <CustomInput
                labelText="Holidays"
                id="holidays"
                error={daysflag}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  defaultValue: props.prop[12],
                }}
              />
              {/* <CustomInput
                labelText="Total Days"
                id="totalDays"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  disabled: true,
                  defaultValue: props.prop[12],
                }}
              />
              <CustomInput
                labelText="Weekends"
                id="weekrnds"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  disabled: true,
                  defaultValue: props.prop[12],
                }}
              /> */}
              {startdatee && enddatee && (
                <>
                  {" "}
                  <p>
                    Total days :{" "}
                    {(enddatee - startdatee) / (1000 * 60 * 60 * 24) + 1}{" "}
                  </p>
                  <p>
                    weekends :{" "}
                    {(enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                      1 -
                      getBusinessDatesCount(startdatee, enddatee)}
                  </p>
                </>
              )}

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

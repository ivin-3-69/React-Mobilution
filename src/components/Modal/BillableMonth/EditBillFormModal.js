/*eslint-disable*/

import React, { useState, useEffect, useRef } from "react";
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

  const [holidayss, setholidayss] = useState();

  const workingdays = useRef(0);
  const [workingdayss, setworkingdayss] = useState(props.prop[9]);

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
      }
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  function valid(current) {
    return current.isAfter(startdatee);
  }

  useEffect(() => {
    if (startdatee && enddatee) {
      if (startdatee.getMonth() && enddatee.getMonth()) {
        axios
          .get(
            `/holiday/count/byrange?id=${
              props.prop[2]
            }&startdate=${startdatee.getFullYear()}-${
              startdatee.getMonth() + 1
            }-${startdatee.getDate()}&enddate=${enddatee.getFullYear()}-${
              enddatee.getMonth() + 1
            }-${enddatee.getDate()}`,
            {
              headers: {
                Authorization: `Bearer ${props.token.token}`,
              },
            }
          )
          .then(function (response) {
            setholidayss(response.data.payload);

            if (
              (enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                1 -
                ((enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                  1 -
                  getBusinessDatesCount(startdatee, enddatee)) -
                response.data.payload >=
              0
            ) {
              if (workingdays.current) {
                workingdays.current.value =
                  (enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                  1 -
                  ((enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                    1 -
                    getBusinessDatesCount(startdatee, enddatee)) -
                  response.data.payload;
              }
            }
          });
      }
    }
  }, [startdatee, enddatee]);

  useEffect(() => {
    setstartdate(new Date(`${props.prop[6]}`));
    setenddate(new Date(`${props.prop[7]}`));
  }, [props.prop[6], props.prop[7]]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (startdatee.getDate() < 10) {
      var newdate = `0${startdatee.getDate()}`;
    } else {
      newdate = startdatee.getDate();
    }

    if (startdatee.getMonth() + 1 < 10) {
      var newmonth = `0${startdatee.getMonth() + 1}`;
    } else {
      newmonth = startdatee.getMonth() + 1;
    }

    if (enddatee.getDate() < 10) {
      var newdate2 = `0${enddatee.getDate()}`;
    } else {
      newdate2 = enddatee.getDate();
    }

    if (enddatee.getMonth() + 1 < 10) {
      var newmonth2 = `0${enddatee.getMonth() + 1}`;
    } else {
      newmonth2 = enddatee.getMonth() + 1;
    }

    const totaldayss = getDifferenceInDays(startdatee, enddatee) + 1;
    const businessdays = getBusinessDatesCount(startdatee, enddatee);
    const weekendss = totaldayss - businessdays;
    // console.log(startdatee, enddatee);
    console.log(Number(workingdays.current.value), holidayss);
    console.log(weekendss, totaldayss);
    console.log(
      Number(workingdays.current.value) + holidayss + weekendss,
      totaldayss
    );

    if (
      Number(workingdays.current.value) + holidayss + weekendss <=
      totaldayss
    ) {
      axios({
        method: "post",
        url: "/billablemonth/save",
        data: [
          {
            id: props.prop[0],

            clientLocationId: props.prop[2],

            startDate: `${startdatee.getFullYear()}-${newmonth}-${newdate}`,

            endDate: `${enddatee.getFullYear()}-${newmonth2}-${newdate2}`,

            totalDays: totaldayss,

            weekends: weekendss,

            holidays:
              totaldayss - weekendss - Number(workingdays.current.value),

            workingDays: Number(workingdays.current.value),

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
              {startdatee.getDate() > 0 ? (
                <FormControl fullWidth>
                  <Datetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    inputProps={{ placeholder: "Date Picker Here" }}
                    value={startdatee}
                    onChange={(event) => {
                      if (event._d) {
                        if (event._d.getHours() === 0) {
                          event._d.setHours(5, 30, 0);
                        }
                        setstartdate((prev) => event._d);
                      }
                    }}
                    // input={true}
                  />
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <Datetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    inputProps={{ placeholder: "Date Picker Here", value: "" }}
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
              )}

              <InputLabel className={classes.label}>End Date</InputLabel>
              <br />
              {enddatee.getDate() > 0 ? (
                <FormControl fullWidth>
                  <Datetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    inputProps={{ placeholder: "Date Picker Here" }}
                    value={enddatee}
                    onChange={(event) => {
                      if (event._d) {
                        if (event._d.getHours() === 0) {
                          event._d.setHours(5, 30, 0);
                        }
                        setenddate((prev) => event._d);
                      }
                    }}
                    // input={true}
                    isValidDate={valid}
                  />
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <Datetime
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                    inputProps={{ placeholder: "Date Picker Here", value: "" }}
                    onChange={(event) => {
                      if (event._d) {
                        if (event._d.getHours() === 0) {
                          event._d.setHours(5, 30, 0);
                        }
                        setenddate((prev) => event._d);
                      }
                    }}
                    // input={true}
                    isValidDate={valid}
                  />
                </FormControl>
              )}

              {startdatee.getDate() > 0 && enddatee.getDate() > 0 && (
                <CustomInput
                  labelText="Working Days"
                  id="WorkDays"
                  error={daysflag}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      setworkingdayss(event.target.value);
                    },
                    type: "number",
                    inputRef: workingdays,
                    defaultValue: workingdayss,
                  }}
                />
              )}

              {startdatee.getDate() >= 0 &&
                enddatee.getDate() >= 0 &&
                holidayss >= 0 && (
                  <>
                    {" "}
                    <p>
                      Total days :{" "}
                      {(enddatee - startdatee) / (1000 * 60 * 60 * 24) + 1}
                    </p>
                    <p>
                      Weekends :{" "}
                      {(enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                        1 -
                        getBusinessDatesCount(startdatee, enddatee)}
                    </p>
                    <p>Client Holidays : {holidayss} </p>
                    {/* <p>
                      leave :{" "}
                      {(enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                        1 -
                        ((enddatee - startdatee) / (1000 * 60 * 60 * 24) +
                          1 -
                          getBusinessDatesCount(startdatee, enddatee)) -
                        holidayss -
                        workingdayss}
                    </p> */}
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

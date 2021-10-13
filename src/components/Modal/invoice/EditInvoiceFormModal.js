/*eslint-disable*/

import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Datetime from "react-datetime";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  const classes = useStyles();
  const [dropdowntitle, setDropDownTitle] = useState(props.prop[14]);
  const statuslist = ["invoiced", "paid"];
  const [startdatee, setstartdate] = useState(new Date(`${props.prop[13]}`));
  const [enddatee, setenddate] = useState(new Date(`${props.prop[15]}`));
  const hoursdays = useRef(0);
  // const invoiceno = useRef();
  const [hoursdayss, sethoursdayss] = useState(props.prop[18]);
  // const [invoicenoo, setinvoicenoo] = useState(props.prop[12]);

  var yesterday = new Date(props.prop[6]);
  function valid(current) {
    return current.isAfter(yesterday);
  }

  useEffect(() => {
    setstartdate(new Date(`${props.prop[6]}`));
    setenddate(new Date(`${props.prop[7]}`));
    setDropDownTitle(props.prop[14]);
    sethoursdayss(props.prop[18]);
    if (hoursdays.current) {
      hoursdays.current.value = props.prop[18];
    }
  }, [props.prop[6], props.prop[7], props.BillMonth]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (dropdowntitle === "generated" || dropdowntitle === "Pending") {
      if (event.target[0].value) {
        axios({
          method: "post",
          url: "/invoice/edit",
          data: {
            invoiceId: `${props.prop[16]}`,
            invoiceStatus: dropdowntitle,
            hoursOrDays: event.target[0].value,
          },
          headers: {
            Authorization: `Bearer ${props.token.token}`,
          },
        }).then((response) => {
          props.hello();
        });
        props.love();
      }
    } else if (dropdowntitle === "paid") {
      if (
        event.target[0].value &&
        event.target[1].value &&
        startdatee &&
        enddatee
      ) {
        if (startdatee.getDate() > 0 && enddatee.getDate() > 0) {
          axios({
            method: "post",
            url: "/invoice/edit",
            data: {
              invoiceId: `${props.prop[16]}`,

              invoiceDate: `${startdatee.getFullYear()}-${
                startdatee.getMonth() + 1
              }-${startdatee.getDate()}`,

              invoiceStatus: dropdowntitle,
              invoiceNo: event.target[1].value,

              paymentDate: `${enddatee.getFullYear()}-${
                enddatee.getMonth() + 1
              }-${enddatee.getDate()}`,

              hoursOrDays: event.target[0].value,
            },
            headers: {
              Authorization: `Bearer ${props.token.token}`,
            },
          }).then((response) => {
            props.hello();
          });
          props.love();
        }
      }
    } else {
      if (event.target[0].value && event.target[1].value && startdatee) {
        if (startdatee.getDate() > 0) {
          console.log(startdatee);
          axios({
            method: "post",
            url: "/invoice/edit",
            data: {
              invoiceId: `${props.prop[16]}`,

              invoiceDate: `${startdatee.getFullYear()}-${
                startdatee.getMonth() + 1
              }-${startdatee.getDate()}`,

              invoiceStatus: dropdowntitle,

              invoiceNo: event.target[1].value,

              hoursOrDays: event.target[0].value,
            },
            headers: {
              Authorization: `Bearer ${props.token.token}`,
            },
          }).then((response) => {
            props.hello();
          });
          props.love();
        }
      }
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {dropdowntitle === "generated" || dropdowntitle === "Pending" ? (
          <Card>
            <CardBody>
              <form onSubmit={submitHandler}>
                <CustomInput
                  labelText="Billable days/hours"
                  id="BillableDays/Hours"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "text",
                    onChange: (event) => {
                      sethoursdayss(event.target.value);
                    },
                    inputRef: hoursdays,
                    defaultValue: hoursdayss,
                  }}
                />
                <CustomDropdown
                  buttonText={dropdowntitle}
                  dropdownList={statuslist}
                  onClick={(key) => {
                    setDropDownTitle(statuslist[key]);
                  }}
                />
                <Button type="submit" color="rose">
                  Submit
                </Button>
              </form>
            </CardBody>
          </Card>
        ) : (
          <Card>
            {dropdowntitle === "invoiced" ? (
              <CardBody>
                {/* {console.log(props.prop[12], "as")} */}
                <form onSubmit={submitHandler}>
                  <CustomInput
                    labelText="Billable days/hours"
                    id="BillableDays/Hours"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      onChange: (event) => {
                        sethoursdayss(event.target.value);
                      },
                      inputRef: hoursdays,
                      defaultValue: hoursdayss,
                    }}
                  />
                  <CustomInput
                    labelText="Invoice No"
                    id="invoice"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: props.prop[12],
                    }}
                  />

                  <CustomDropdown
                    buttonText={dropdowntitle}
                    dropdownList={statuslist}
                    onClick={(key) => {
                      setDropDownTitle(statuslist[key]);
                    }}
                  />
                  <InputLabel className={classes.label}>
                    Invoice Date
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      dateFormat="DD/MM/YYYY"
                      inputProps={{ placeholder: "Date Picker Here" }}
                      initialValue={startdatee}
                      isValidDate={valid}
                      onChange={(event) => {
                        setstartdate((prev) => event._d);
                      }}
                    />
                  </FormControl>
                  <Button type="submit" color="rose">
                    Submit
                  </Button>
                </form>
              </CardBody>
            ) : (
              <CardBody>
                <form onSubmit={submitHandler}>
                  <CustomInput
                    labelText="Billable days/hours"
                    id="BillableDays/Hours"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      onChange: (event) => {
                        sethoursdayss(event.target.value);
                      },
                      inputRef: hoursdays,
                      defaultValue: hoursdayss,
                    }}
                  />
                  <CustomInput
                    labelText="Invoice No"
                    id="invoice"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      defaultValue: props.prop[12],
                      disabled: true,
                    }}
                  />

                  <CustomDropdown
                    buttonText={dropdowntitle}
                    dropdownList={statuslist}
                    onClick={(key) => {
                      setDropDownTitle(statuslist[key]);
                    }}
                  />
                  <InputLabel className={classes.label}>
                    Invoice Date
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      dateFormat="DD/MM/YYYY"
                      inputProps={{
                        placeholder: "Date Picker Here",
                        disabled: true,
                      }}
                      initialValue={startdatee}
                      isValidDate={valid}
                      onChange={(event) => {
                        setstartdate((prev) => event._d);
                      }}
                    />
                  </FormControl>
                  <InputLabel className={classes.label}>
                    Payment Date
                  </InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      dateFormat="DD/MM/YYYY"
                      inputProps={{ placeholder: "Date Picker Here" }}
                      initialValue={enddatee}
                      onChange={(event) => {
                        setenddate((prev) => event._d);
                      }}
                      isValidDate={valid}
                    />
                  </FormControl>
                  <Button type="submit" color="rose">
                    Submit
                  </Button>
                </form>
              </CardBody>
            )}
          </Card>
        )}
      </GridItem>
    </GridContainer>
  );
}

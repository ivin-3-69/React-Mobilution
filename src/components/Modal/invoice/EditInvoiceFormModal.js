/*eslint-disable*/

import React, { useState } from "react";
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
  const statuslist = ["Invoiced", "Paid"];
  const [startdatee, setstartdate] = useState(new Date(`${props.prop[13]}`));
  const [enddatee, setenddate] = useState(new Date(`${props.prop[15]}`));

  const submitHandler = (event) => {
    event.preventDefault();
    if (event.target[0].value && event.target[1].value) {
      if (dropdowntitle === "Paid") {
        axios({
          method: "post",
          url: "/invoice/edit",
          data: {
            invoiceId: `${props.prop[16]}`,

            invoiceNo: event.target[0].value,

            invoiceDate: `${startdatee.getFullYear()}-${
              startdatee.getMonth() + 1
            }-${startdatee.getDate()}`,

            invoiceStatus: dropdowntitle,

            paymentDate: `${enddatee.getFullYear()}-${
              enddatee.getMonth() + 1
            }-${enddatee.getDate()}`,

            hoursOrDays: event.target[1].value,
          },
          headers: {
            Authorization: `Bearer ${props.token.token}`,
          },
        }).then((response) => {
          props.hello();
        });
      } else {
        axios({
          method: "post",
          url: "/invoice/edit",
          data: {
            invoiceId: `${props.prop[16]}`,

            invoiceNo: event.target[0].value,

            invoiceDate: `${startdatee.getFullYear()}-${
              startdatee.getMonth() + 1
            }-${startdatee.getDate()}`,

            invoiceStatus: dropdowntitle,

            hoursOrDays: event.target[1].value,
          },
          headers: {
            Authorization: `Bearer ${props.token.token}`,
          },
        }).then((response) => {
          props.hello();
        });
      }

      props.love();
    }
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <form onSubmit={submitHandler}>
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
              <CustomInput
                labelText="Billable days/hours"
                id="BillableDays/Hours"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                  defaultValue: props.prop[18],
                }}
              />
              <CustomDropdown
                buttonText={dropdowntitle}
                dropdownList={statuslist}
                onClick={(key) => {
                  setDropDownTitle(statuslist[key]);
                }}
              />
              <InputLabel className={classes.label}>Invoice Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Date Picker Here" }}
                  initialValue={new Date(props.prop[13])}
                  onChange={(event) => {
                    setstartdate((prev) => event._d);
                  }}
                />
              </FormControl>
              {dropdowntitle === "Paid" && (
                <div>
                  {" "}
                  <InputLabel className={classes.label}>
                    Payment Date
                  </InputLabel>
                  <p style={{ color: "red" }}>*compulsory</p>
                  <FormControl fullWidth>
                    <Datetime
                      timeFormat={false}
                      inputProps={{ placeholder: "Date Picker Here" }}
                      initialValue={new Date(props.prop[15])}
                      onChange={(event) => {
                        setenddate((prev) => event._d);
                      }}
                    />
                  </FormControl>
                </div>
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

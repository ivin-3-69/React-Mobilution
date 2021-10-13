/*eslint-disable*/

import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Datetime from "react-datetime";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
const useStyles = makeStyles(styles);

export default function ModalForm(props) {
  const classes = useStyles();
  const [dropdowntitle, setDropDownTitle] = useState("bill type");
  const [dropdowntitle2, setDropDownTitle2] = useState("client");
  const [chosenbilltype, setchosenbilltype] = useState("");
  const [clientnamelist, setClientnamelist] = useState([""]);
  const [clientidlist, setClientidlist] = useState([]);
  const [chosenclient, setChosenClient] = useState();
  const [dropdowntitle3, setDropDownTitle3] = useState("client location");
  const [clientlocationnamelist, setClientLocationnamelist] = useState([""]);
  const [clientlocationidlist, setClientLocationidlist] = useState();
  const [chosenclientlocation, setChosenClientLocation] = useState();
  const [checked, setChecked] = React.useState(false);
  const [startdatee, setstartdate] = useState();
  const [enddatee, setenddate] = useState();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  var yesterday = new Date(props.lastDate);
  function valid(current) {
    return current.isAfter(yesterday);
  }
  useEffect(() => {
    axios({
      method: "get",
      url: "/client/list",

      headers: {
        Authorization: `Bearer ${props.token.token}`,
      },
    }).then((response) => {
      const clientdata = response.data.payload;
      const clienttransferredData = clientdata.map((item) =>
        Object.values(item)
      );
      const userfinaldata = clienttransferredData.map((item) =>
        item.splice(0, 3)
      );
      const clientname2DList = userfinaldata.map((item) => item.splice(2, 3));
      const clientid2DList = userfinaldata.map((item) => item.splice(0, 1));

      var clientname1d = [];
      var clientid1d = [];

      for (var i = 0; i < clientname2DList.length; i++) {
        clientname1d = clientname1d.concat(clientname2DList[i]);
      }
      for (var i = 0; i < clientid2DList.length; i++) {
        clientid1d = clientid1d.concat(clientid2DList[i]);
      }

      setClientnamelist(clientname1d);
      setClientidlist(clientid1d);
    });
  }, []);
  useEffect(() => {
    setClientLocationidlist();
    setDropDownTitle3("choose location");
    if (chosenclient) {
      var url = `/clientlocation/byclient?id=${chosenclient}`;
      axios({
        method: "get",
        url: url,

        headers: {
          Authorization: `Bearer ${props.token.token}`,
        },
      }).then((response) => {
        const clientlocationdata = response.data.payload;
        const clientlocationtransfferedData = clientlocationdata.map((item) =>
          Object.values(item)
        );
        const ddata = clientlocationtransfferedData.map((item) =>
          item.splice(0, 2)
        );
        const clientlocationList = ddata.map((item) => item.splice(0, 1));
        var clientlocationname1d = [];
        var clientlocationid1d = [];

        for (var i = 0; i < ddata.length; i++) {
          clientlocationname1d = clientlocationname1d.concat(ddata[i]);
        }
        for (var j = 0; j < clientlocationList.length; j++) {
          clientlocationid1d = clientlocationid1d.concat(clientlocationList[j]);
        }

        setClientLocationnamelist(clientlocationname1d);
        setClientLocationidlist(clientlocationid1d);
      });
    }
  }, [chosenclient, dropdowntitle2]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      startdatee &&
      enddatee &&
      event.target[2].value &&
      event.target[5].value >= 0 &&
      event.target[5].value <= 24 &&
      event.target[4].value >= 0 &&
      event.target[8].value >= 0
    ) {
      var startdate = `${startdatee.getFullYear()}-${
        startdatee.getMonth() + 1
      }-${startdatee.getDate()}`;

      var enddate = `${enddatee.getFullYear()}-${
        enddatee.getMonth() + 1
      }-${enddatee.getDate()}`;
      axios({
        method: "post",
        url: "/assign/clientlocation",
        data: {
          consultantId: props.id,

          startDate: startdate,

          endDate: enddate,

          clientLocationId: chosenclientlocation,

          billRate: event.target[4].value,

          paidLeaves: event.target[8].value,

          holidayPayable: checked ? "Y" : "N",

          overtimeBillable: "Y",

          billType: chosenbilltype,

          hoursPerDay: event.target[5].value,

          poDetails: {
            poNo: event.target[2].value,

            startDate: startdate,

            endDate: enddate,
          },
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
              <InputLabel className={classes.label}>Start Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Date Picker Here" }}
                  isValidDate={valid}
                  dateFormat="DD/MM/YYYY"
                  onChange={(event) => {
                    setstartdate((prev) => event._d);
                  }}
                />
              </FormControl>
              <InputLabel className={classes.label}>End Date</InputLabel>
              <br />
              <FormControl fullWidth>
                <Datetime
                  timeFormat={false}
                  inputProps={{ placeholder: "Date Picker Here" }}
                  isValidDate={valid}
                  dateFormat="DD/MM/YYYY"
                  onChange={(event) => {
                    setenddate((prev) => event._d);
                  }}
                />
              </FormControl>
              <CustomInput
                labelText="Po No"
                id="pono"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                }}
              />
              <CustomDropdown
                buttonText={dropdowntitle}
                dropdownList={["hourly", "daily", "mothly(w)", "monthly(c)"]}
                buttonProps={{}}
                onClick={(key) => {
                  setDropDownTitle(
                    ["hourly", "daily", "mothly(w)", "monthly(c)"][key]
                  );
                  setchosenbilltype(
                    ["hourly", "daily", "mothly(w)", "monthly(c)"][key]
                  );
                }}
              />
              <CustomInput
                labelText="Rate"
                id="rate"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  step: 0.01,
                }}
              />
              <CustomInput
                labelText="Hours Per Day"
                id="hoursperday"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                  placeholder: "Mandotory if hourly bill type",
                }}
              />
              <CustomDropdown
                buttonText={dropdowntitle2}
                dropdownList={clientnamelist}
                buttonProps={{}}
                onClick={(key) => {
                  setDropDownTitle2(clientnamelist[key]);
                  setChosenClient(clientidlist[key]);
                }}
              />
              {chosenclient && (
                <>
                  {clientlocationidlist ? (
                    <CustomDropdown
                      buttonText={dropdowntitle3}
                      dropdownList={clientlocationnamelist}
                      buttonProps={{}}
                      onClick={(key) => {
                        setDropDownTitle3(clientlocationnamelist[key]);
                        setChosenClientLocation(clientlocationidlist[key]);
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                </>
              )}
              <CustomInput
                labelText="Paid Leaves No"
                id="paidLeaves"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "number",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p>Holidays Payable ?:</p>
                <Checkbox
                  checked={checked}
                  color="default"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
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

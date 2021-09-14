/*eslint-disable*/

import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// material-ui icons
import Room from "@material-ui/icons/Work";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";

import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddClientModal from "components/Modal/Consultant/AddConsultantModal";

import ClientDetail from "./timesheet2";
import { events } from "variables/general";

const useStyles = makeStyles(styles);

export default function Consultant(props) {
  //console.log(props);
  const [mode, setMode] = useState(true);
  const [ClientDetailId, setClientDetailId] = useState();
  const [location, setLocation] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [ClientDetailName, setClientDetailName] = useState();
  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  const [Holidays, setHolidays] = useState(null);
  const [BillMonth, setBillMonth] = useState(
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ][new Date().getMonth()]
  );
  const [BillMonthNumber, setBillMonthNumber] = useState(
    new Date().getMonth() + 1
  );
  const [dropdowntitle, setDropDownTitle] = useState(
    [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ][new Date().getMonth()]
  );
  const [billyear, setbillyear] = useState(new Date().getFullYear());
  const [dropdowntitle2, setDropDownTitle2] = useState(2021);

  function hello() {
    axios
      .get(
        `/consultant/monthly/list?month=${BillMonthNumber}&year=${billyear}`,
        {
          headers: {
            Authorization: `Bearer ${props.header.token}`,
          },
        }
      )
      .then(function (response) {
        const data = response.data.payload;
        if (data) {
          const transData = data.map((item) => Object.values(item));
          setClientData(transData);
        }
        setResponse(true);
      });
  }
  useEffect(() => {
    hello();
  }, [BillMonth, billyear]);

  const classes = useStyles();

  return (
    <>
      {mode ? (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              {Response ? (
                <>
                  <CardHeader color="rose" icon>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                        Consultant Timesheet
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <CustomDropdown
                          buttonText={dropdowntitle}
                          dropdownList={[
                            "JAN",
                            "FEB",
                            "MAR",
                            "APR",
                            "MAY",
                            "JUN",
                            "JUL",
                            "AUG",
                            "SEP",
                            "OCT",
                            "NOV",
                            "DEC",
                          ]}
                          buttonProps={{}}
                          onClick={(key) => {
                            setDropDownTitle(
                              [
                                "JAN",
                                "FEB",
                                "MAR",
                                "APR",
                                "MAY",
                                "JUN",
                                "JUL",
                                "AUG",
                                "SEP",
                                "OCT",
                                "NOV",
                                "DEC",
                              ][key]
                            );
                            setBillMonth(
                              [
                                "JAN",
                                "FEB",
                                "MAR",
                                "APR",
                                "MAY",
                                "JUN",
                                "JUL",
                                "AUG",
                                "SEP",
                                "OCT",
                                "NOV",
                                "DEC",
                              ][key]
                            );
                            setBillMonthNumber(key + 1);
                          }}
                        />
                        <CustomDropdown
                          buttonText={dropdowntitle2}
                          dropdownList={[
                            2019,
                            2020,
                            2021,
                            2022,
                            2023,
                            2024,
                            2025,
                          ]}
                          buttonProps={{}}
                          onClick={(key) => {
                            setDropDownTitle2(
                              [2019, 2020, 2021, 2022, 2023, 2024, 2025][key]
                            );
                            setbillyear(
                              [2019, 2020, 2021, 2022, 2023, 2024, 2025][key]
                            );
                          }}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={ClientData.map((prop, key) => {
                        return {
                          id: key,
                          firstname: prop[1],
                          lastname: prop[2],
                          employeeId: prop[3],
                          clientname: prop[6].client.client,
                          clientlocname: prop[6].clientLocation.locationName,
                          isFinalised: (
                            <div
                              className={
                                classes.checkboxAndRadio +
                                " " +
                                classes.checkboxAndRadioHorizontal
                              }
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={prop[9] === "Y" ? true : false}
                                    classes={{
                                      checked: classes.checked,
                                      root: classes.checkRoot,
                                    }}
                                    onChange={(event) => {
                                      if (event.target.checked === true) {
                                        axios({
                                          method: "post",
                                          url: "/timesheet/save",
                                          data: {
                                            consultantId: prop[0],

                                            month: new Date().getMonth() + 1,

                                            year: new Date().getFullYear(),

                                            isFinalised: "Y",
                                          },
                                          headers: {
                                            Authorization: `Bearer ${props.header.token}`,
                                          },
                                        }).then((response) => {
                                          hello();
                                        });
                                      }
                                    }}
                                    checkedIcon={
                                      <Check className={classes.checkedIcon} />
                                    }
                                  />
                                }
                                classes={{ label: classes.label }}
                                label={
                                  prop[9] === "Y" ? "Finalised" : "In-Progress"
                                }
                              />
                            </div>
                          ),
                          actions: (
                            // we've added some custom button actions
                            <div className={classes.right}>
                              <Tooltip
                                id="tooltip-top"
                                title="consultant Timesheet"
                                placement="top"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                {prop[9] === "Y" ? (
                                  <Button
                                    round
                                    onClick={() => {
                                      setMode(false);
                                      setClientDetailId(prop[0]);
                                      setClientDetailName(prop[1]);
                                      setHolidays(prop[12]);
                                      alert("Already Finalised Timesheet.");
                                      setLocation(prop[11]);
                                      setStart(prop[7]);
                                      setEnd(prop[8]);
                                    }}
                                    color="info"
                                    className={
                                      classes.actionButton +
                                      " " +
                                      classes.actionButtonRound
                                    }
                                  >
                                    <Room className={classes.icon} />
                                  </Button>
                                ) : (
                                  <Button
                                    round
                                    onClick={() => {
                                      setMode(false);
                                      setClientDetailId(prop[0]);
                                      setClientDetailName(prop[1]);
                                      setHolidays(prop[12]);
                                      setLocation(prop[11]);
                                      setStart(prop[7]);
                                      setEnd(prop[8]);
                                    }}
                                    color="info"
                                    className={
                                      classes.actionButton +
                                      " " +
                                      classes.actionButtonRound
                                    }
                                  >
                                    <Room className={classes.icon} />
                                  </Button>
                                )}
                              </Tooltip>
                            </div>
                          ),
                        };
                      })}
                      columns={[
                        {
                          Header: "Client",
                          accessor: "clientname",
                        },
                        {
                          Header: "Client Location",
                          accessor: "clientlocname",
                        },
                        {
                          Header: "First Name",
                          accessor: "firstname",
                        },
                        {
                          Header: "Last Name",
                          accessor: "lastname",
                        },
                        {
                          Header: "Status",
                          accessor: "isFinalised",
                        },
                        {
                          Header: "Actions",
                          accessor: "actions",
                        },
                      ]}
                    />
                  </CardBody>
                </>
              ) : (
                <>
                  <CardHeader color="rose" icon>
                    <h3 style={{ color: "#345282", paddingLeft: "15px" }}>
                      Consultant Timesheet
                    </h3>
                  </CardHeader>
                  <h4 style={{ textAlign: "center" }}>Loading...</h4>
                </>
              )}
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <ClientDetail
          click={() => {
            setMode(true);
          }}
          header={props.header}
          clientId={ClientDetailId}
          location={location}
          clientName={ClientDetailName}
          Holidays={Holidays}
          BillMonthNumber={BillMonthNumber}
          billyear={billyear}
          startDate={start}
          endDate={end}
        ></ClientDetail>
      )}
    </>
  );
}

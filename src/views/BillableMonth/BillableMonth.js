/*eslint-disable*/

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "store/auth-context";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { tooltip } from "assets/jss/material-dashboard-pro-react.js";
import Tooltip from "@material-ui/core/Tooltip";

// material-ui icons
import Room from "@material-ui/icons/Room";

import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactEditableTable";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import EditClientModal from "components/Modal/BillableMonth/EditBillModal";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const useStyles = makeStyles(styles);

export default function ExtendedTables(props) {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  function join(t, a, s) {
    if (t) {
      const t1 = new Date(t);
      function format(m) {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t1);
      }
      return a.map(format).join(s);
    }
    return t;
  }

  let a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }];

  const [yearArray, setyearArray] = useState([]);
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
  const [ClientData, setClientData] = useState([]);
  const [Response, setResponse] = useState(false);
  const [billyear, setbillyear] = useState(new Date().getFullYear());
  const [dropdowntitle2, setDropDownTitle2] = useState(2021);
  function hello() {
    axios
      .get(`/billablemonth/list?monthName=${BillMonth}&year=${billyear}`, {
        headers: {
          Authorization: `Bearer ${props.header.token}`,
        },
      })
      .then(function (response) {
        if (response.status === 401) {
          ctx.logout();
        } else {
          const data = response.data.payload;
          const transData = data.map((item) => Object.values(item));
          const ddata = transData.map((item) =>
            item.filter((dada) => dada !== null)
          );
          setClientData(ddata);
          setResponse(true);
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            ctx.logout();
          }
        }
      });
  }

  useEffect(() => {
    hello();
    var array = [];
    if (billyear > 0) {
      for (let i = -5; i < 6; i++) {
        array.push(billyear + i);
      }
    } else {
      for (let i = -5; i < 6; i++) {
        array.push(new Date().getFullYear() + i);
      }
    }
    setyearArray(array);
  }, [BillMonth, billyear, BillMonthNumber]);

  return (
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
                    Billable Month Grid
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
                      dropdownList={yearArray}
                      buttonProps={{}}
                      onClick={(key) => {
                        setDropDownTitle2(yearArray[key]);
                        setbillyear(yearArray[key]);
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
                      clientName: prop[3],
                      locationName: prop[4],
                      startdate: join(prop[6], a, " "),
                      enddate: join(prop[7], a, " "),
                      totalDays: prop[10],
                      workingDays: prop[9],
                      weekends: prop[11],
                      holidays: prop[12],
                      valid: prop[13] ? "yes" : "no",
                      actions: (
                        <div className={classes.right}>
                          {BillMonthNumber > new Date().getMonth() - 1 &&
                          billyear >= new Date().getFullYear() ? (
                            <div>
                              {prop[13] ? (
                                <Tooltip
                                  id="tooltip-top"
                                  title="edit"
                                  placement="top"
                                  classes={{ tooltip: classes.tooltip }}
                                >
                                  <Button
                                    round
                                    color="success"
                                    className={
                                      classes.actionButton +
                                      " " +
                                      classes.actionButtonRound
                                    }
                                  >
                                    <EditClientModal
                                      prop={prop}
                                      token={props.header}
                                      BillMonth={BillMonth}
                                      BillMonthNumber={BillMonthNumber}
                                      billyear={billyear}
                                      hello={hello}
                                    ></EditClientModal>
                                  </Button>
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  id="tooltip-top"
                                  title="edit"
                                  placement="top"
                                  classes={{ tooltip: classes.tooltip }}
                                >
                                  <Button
                                    round
                                    disabled
                                    className={
                                      classes.actionButton +
                                      " " +
                                      classes.actionButtonRound
                                    }
                                  >
                                    <EditClientModal
                                      prop={prop}
                                      token={props.header}
                                      BillMonth={BillMonth}
                                      BillMonthNumber={BillMonthNumber}
                                      billyear={billyear}
                                      hello={hello}
                                    ></EditClientModal>
                                  </Button>
                                </Tooltip>
                              )}
                            </div>
                          ) : (
                            <Tooltip
                              id="tooltip-top"
                              title="edit"
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button
                                round
                                disabled
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                              >
                                <EditClientModal
                                  prop={prop}
                                  token={props.header}
                                  BillMonth={BillMonth}
                                  BillMonthNumber={BillMonthNumber}
                                  billyear={billyear}
                                  hello={hello}
                                ></EditClientModal>
                              </Button>
                            </Tooltip>
                          )}
                        </div>
                      ),
                    };
                  })}
                  columns={[
                    {
                      Header: "Client",
                      accessor: "clientName",
                    },
                    {
                      Header: "Location",
                      accessor: "locationName",
                    },
                    {
                      Header: "Start Date",
                      accessor: "startdate",
                    },
                    {
                      Header: "End Date",
                      accessor: "enddate",
                    },
                    {
                      Header: "Total Days",
                      accessor: "totalDays",
                    },
                    {
                      Header: "Working Days",
                      accessor: "workingDays",
                    },
                    {
                      Header: "Weekends",
                      accessor: "weekends",
                    },
                    {
                      Header: "Holidays",
                      accessor: "holidays",
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
                  Billable Month Grid
                </h3>
              </CardHeader>
              <h4 style={{ textAlign: "center" }}>Loading...</h4>
            </>
          )}
        </Card>
      </GridItem>
    </GridContainer>
  );
}
